import os
from dotenv import load_dotenv

from swarmstar import Swarmstar
from swarmstar.swarm.types import SwarmConfig

from app.utils.mongodb import get_kv
from app.api.swarm_operation_queue import swarm_operation_queue

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
    
    # This operation spawns the root node and returns the set of route
    # action spawn operations with subdirectives derived from your goal
    root_swarm_operation = swarmstar.spawn_root(goal)
    swarm_operation_queue.put((swarm_id, root_swarm_operation))
