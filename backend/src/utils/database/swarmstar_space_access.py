import os
from dotenv import load_dotenv
from swarmstar.swarm.types import SwarmOperation, SwarmConfig, SwarmNode

from src.utils.database.mongodb import get_kv, delete_kv

load_dotenv()
swarmstar_space_db_name = os.getenv("SWARMSTAR_SPACE_DB_NAME")


def get_swarm_config(config_id: str) -> SwarmConfig:
    return SwarmConfig(**get_kv(swarmstar_space_db_name, "config", config_id))


def get_swarm_node(node_id: str) -> SwarmNode:
    return SwarmNode(**get_kv(swarmstar_space_db_name, "swarm_state", node_id))


def get_swarm_operation(operation_id: str) -> SwarmOperation:
    return SwarmOperation(
        **get_kv(swarmstar_space_db_name, "swarm_history", operation_id)
    )


def get_swarm_node_ids(swarm_id: str) -> list:
    return get_kv(swarmstar_space_db_name, "swarm_state", swarm_id)["data"]


def get_swarm_operation_ids(swarm_id: str) -> list:
    return get_kv(swarmstar_space_db_name, "swarm_history", swarm_id)["data"]


def get_swarm_memory_ids(swarm_id: str) -> list:
    return get_kv(swarmstar_space_db_name, "memory_space", swarm_id)["data"]


def get_swarm_action_ids(swarm_id: str) -> list:
    return get_kv(swarmstar_space_db_name, "action_space", swarm_id)["data"]


def get_swarm_util_ids(swarm_id: str) -> list:
    return get_kv(swarmstar_space_db_name, "util_space", swarm_id)["data"]


def delete_swarm(swarm_id: str) -> None:
    for node_id in get_swarm_node_ids(swarm_id):
        delete_kv(swarmstar_space_db_name, "swarm_state", node_id)
    for operation_id in get_swarm_operation_ids(swarm_id):
        delete_kv(swarmstar_space_db_name, "swarm_history", operation_id)
    for memory_id in get_swarm_memory_ids(swarm_id):
        delete_kv(swarmstar_space_db_name, "memory_space", memory_id)
    for action_id in get_swarm_action_ids(swarm_id):
        delete_kv(swarmstar_space_db_name, "action_space", action_id)
    for util_id in get_swarm_util_ids(swarm_id):
        delete_kv(swarmstar_space_db_name, "util_space", util_id)

    delete_kv(swarmstar_space_db_name, "memory_space", swarm_id)
    delete_kv(swarmstar_space_db_name, "action_space", swarm_id)
    delete_kv(swarmstar_space_db_name, "util_space", swarm_id)
    delete_kv(swarmstar_space_db_name, "swarm_state", swarm_id)
    delete_kv(swarmstar_space_db_name, "swarm_history", swarm_id)

    


def get_current_swarm_state_representation(swarm_id: str):
    pass
