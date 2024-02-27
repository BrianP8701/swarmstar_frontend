import os
from dotenv import load_dotenv
from swarmstar import Swarmstar
from swarmstar.swarm.types import SwarmConfig

from app.utils.mongodb import get_kv
from app.database_schemas.swarms import Swarm
from app.api.swarm_operation_queue import swarm_operation_queue



load_dotenv()
db_name = os.getenv("SWARM_DB_NAME")

def get_swarm_config() -> dict:
    return SwarmConfig(**get_kv(db_name, "swarm", "swarm"))

def spawn_swarm(swarm_id: str, goal: str):
    swarm_config = get_swarm_config()
    swarmstar = Swarmstar(swarm_config)
    swarmstar.spawn_root(goal)
    swarm_operations, root_node_id = swarmstar.spawn_root(goal)
    swarm = get_kv(db_name, "swarm", swarm_id)
    swarm['root_node_id'] = root_node_id
    swarm['node_ids'].append(root_node_id)
