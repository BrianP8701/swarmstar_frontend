import os
from dotenv import load_dotenv

from swarmstar.types import SwarmOperation, SwarmConfig, SwarmNode
from swarmstar.utils.swarmstar_space import get_swarm_node, get_swarm_operation, get_swarm_state, get_swarm_history, delete_swarmstar_space, get_swarm_node

from src.utils.database.mongodb import get_kv, delete_kv, add_kv, append_to_list
from src.utils.security.generate_uuid import generate_uuid

load_dotenv()
swarmstar_space_db_name = os.getenv("SWARMSTAR_SPACE_DB_NAME")


def get_swarm_config(swarm_id: str) -> SwarmConfig:
    return SwarmConfig(**get_kv(swarmstar_space_db_name, "config", swarm_id))



def get_current_swarm_state_representation(swarm_id: str):
    swarm_config = get_swarm_config(swarm_id)
    swarm_state = get_swarm_state(swarm_config)
    root_node_id = swarm_state[0]
    root_node = get_swarm_node(swarm_config, root_node_id)
    swarm_state_representation = _convert_node_to_d3_tree_node_recursive(swarm_config, root_node)
    return swarm_state_representation

def _convert_node_to_d3_tree_node_recursive(swarm_config: SwarmConfig, node: SwarmNode):
    is_leaf_node = len(node.children_ids) == 0
    is_terminated = not node.alive
    if is_terminated: status = "terminated"
    elif is_leaf_node: status = "active"
    else: status = "waiting"
    
    node_representation = {
        "name": node.name,
        "attributes": {
            "directive": node.message,
            "node_id": node.id,
            "status": status
        }
    }
    
    if not is_leaf_node:
        node_representation["children"] = []
        for child_id in node.children_ids:
            child_node = get_swarm_node(swarm_config, child_id)
            child_representation = _convert_node_to_d3_tree_node_recursive(swarm_config, child_node)
            node_representation["children"].append(child_representation)
    return node_representation

def duplicate_swarm(old_swarm_id: str, copied_swarm_id):
    swarm_config = get_swarm_config(old_swarm_id)
    swarm_state = get_swarm_state(swarm_config)
    swarm_history = get_swarm_history(swarm_config)

    swarm_config.id = copied_swarm_id

    add_kv(swarmstar_space_db_name, "config", copied_swarm_id, swarm_config.model_dump())
    add_kv(swarmstar_space_db_name, "swarm_state", copied_swarm_id, {"data": swarm_state})
    add_kv(swarmstar_space_db_name, "swarm_history", copied_swarm_id, {"data": swarm_history})

    for node_id in swarm_state:
        node = get_swarm_node(swarm_config, node_id)
        node.id = generate_uuid("node")
        add_kv(swarmstar_space_db_name, "swarm_nodes", node.id, node.model_dump())

    for operation_id in swarm_history:
        operation = get_swarm_operation(swarm_config, operation_id)
        operation.id = generate_uuid("operation")
        add_kv(swarmstar_space_db_name, "swarm_operations", operation.id, operation.model_dump())

    append_to_list(swarmstar_space_db_name, "admin", "swarms", "data", copied_swarm_id)
