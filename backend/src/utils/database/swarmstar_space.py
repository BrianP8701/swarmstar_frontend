import os
from dotenv import load_dotenv
from swarmstar.swarm.types import SwarmOperation, SwarmConfig, SwarmNode

from src.utils.database.mongodb import get_kv

load_dotenv()
swarmstar_space_db_name = os.getenv('SWARMSTAR_SPACE_DB_NAME')


def get_swarm_config(config_id: str) -> SwarmConfig:
    return SwarmConfig(**get_kv(swarmstar_space_db_name, "config", config_id))

def get_swarm_node(node_id: str) -> SwarmNode:
    return SwarmNode(**get_kv(swarmstar_space_db_name, "swarm_state", node_id))

def get_swarm_node_journal(node_id: str):
    node = get_swarm_node(node_id)
    return node.journal

def get_swarm_node_logs(node_id: str):
    node = get_swarm_node(node_id)
    return node.developer_logs

def get_swarm_operation(operation_id: str) -> SwarmOperation:
    return SwarmOperation(**get_kv(swarmstar_space_db_name, "swarm_operations", operation_id))

def get_current_swarm_state_representation(swarm_id: str):
    pass

