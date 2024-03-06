import os
from dotenv import load_dotenv

from swarmstar.types import SwarmOperation, SwarmConfig, SwarmNode
from swarmstar.utils.swarmstar_space import get_swarm_node, get_swarm_operation, get_swarm_state, get_swarm_history, delete_swarmstar_space

from src.utils.database.mongodb import get_kv, delete_kv

load_dotenv()
swarmstar_space_db_name = os.getenv("SWARMSTAR_SPACE_DB_NAME")


def get_swarm_config(swarm_id: str) -> SwarmConfig:
    return SwarmConfig(**get_kv(swarmstar_space_db_name, "config", swarm_id))

def get_current_swarm_state_representation(swarm_id: str):
    pass
