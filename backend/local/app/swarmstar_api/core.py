import os
from dotenv import load_dotenv
from swarmstar import Swarmstar
from swarmstar.swarm.types import SwarmConfig, SwarmOperation

from app.utils.mongodb import get_kv, update_kv
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
    for operation in swarm_operations:
        swarm_operation_queue.put((operation, swarm_id))
        
def execute_swarm_operation(swarm_id: str, operation: SwarmOperation) -> None:
    swarm_config = get_swarm_config()
    swarmstar = Swarmstar(swarm_config)
    swarmstar.execute_operation(operation)
    swarm = get_kv(db_name, "swarm", swarm_id)

    update_kv(db_name, "swarm", swarm_id, swarm)
    print(f"Processed operation {operation} for swarm_id {swarm_id}")
    swarm_operation_queue.task_done()
    return None