import os
from dotenv import load_dotenv
from swarmstar import Swarmstar
from swarmstar.swarm.types import SwarmConfig, SwarmOperation

from app.utils.mongodb import get_kv, update_kv, append_to_list_with_versioning, add_kv, add_to_dict_with_versioning
from app.api.swarm_operation_queue import swarm_operation_queue
from app.utils.security.uuid import generate_uuid

load_dotenv()
db_name = os.getenv("SWARMSTAR_INTERFACE_DB_NAME")

def get_swarm_config() -> dict:
    return SwarmConfig(**get_kv(db_name, "swarm", "swarm"))

def spawn_swarm(swarm_id: str, goal: str):
    '''
    Begin the process of spawning a swarm by creating and executing the root node
    '''
    swarm_config = get_swarm_config()
    swarmstar = Swarmstar(swarm_config)
    
    swarm_operations, root_node_id, root_swarm_operation = swarmstar.spawn_root(goal)

    root_swarm_operation_id = generate_uuid('swarm_operation')
    add_kv('swarm_operations', root_swarm_operation_id, root_swarm_operation)
    append_to_list_with_versioning("swarms", swarm_id, "node_ids", root_node_id)
    append_to_list_with_versioning("swarms", swarm_id, "swarm_operation_ids", root_swarm_operation_id)
    
    for operation in swarm_operations:
        swarm_operation_queue.put((operation, swarm_id))

def execute_swarm_operation(swarm_id: str, operation: SwarmOperation) -> None:
    swarm_config = get_swarm_config()
    swarmstar = Swarmstar(swarm_config)
    
    swarmstar.execute_operation(operation)
    
    swarm_operation_id = generate_uuid('swarm_operation')
    add_kv('swarm_operations', swarm_operation_id, operation)
    append_to_list_with_versioning("swarms", swarm_id, "swarm_operation_ids", swarm_operation_id)
    swarm = get_kv(db_name, "swarm", swarm_id)
    
    print(f"Processed operation {operation} for swarm_id {swarm_id}")
    swarm_operation_queue.task_done()
    return None
