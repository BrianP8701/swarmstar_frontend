import asyncio
import os
from dotenv import load_dotenv

from swarmstar import Swarmstar
from swarmstar.swarm.types import SwarmConfig, SwarmOperation

from utils.mongodb import get_kv, add_kv, append_to_list_with_versioning
from utils.security.uuid import generate_uuid

swarm_operation_queue = asyncio.Queue()

load_dotenv()
db_name = os.getenv("SWARMSTAR_INTERFACE_DB_NAME")

def get_swarm_config() -> dict:
    return SwarmConfig(**get_kv("swarm", "swarm", db_name='swarmstar_space'))

async def swarm_operation_queue_worker():
    '''
    This queue constantly processes swarm operations while the application is running.
    
    It makes sure the swarm_id is active. If so, it will process the operation.
    Otherwise it will persist the operation in MongoDB to be processed later.
    '''
    while True:
        swarm_id, operation = await swarm_operation_queue.get()
        # Create a task for non-blocking operation execution

        asyncio.create_task(process_swarm_operation(swarm_id, operation))
        swarm_operation_queue.task_done()

async def process_swarm_operation(swarm_id: str, operation: SwarmOperation) -> None:
    print('\n\n\n\n')
    print(operation)
    print('\n\n\n\n')
    swarm = get_kv('swarms', swarm_id)
    swarm_config = get_swarm_config()
    swarmstar = Swarmstar(swarm_config)
    
    swarm_operation_id = generate_uuid('swarm_operation')
    add_kv('swarm_operations', swarm_operation_id, operation.model_dump())
    
    if swarm['active']:
        next_operations = swarmstar.execute(operation)
        if operation.operation_type == 'spawn':
            append_to_list_with_versioning("swarms", swarm_id, "node_ids", next_operations[0].node_id)
        for next_operation in next_operations:
            await swarm_operation_queue.put((swarm_id, next_operation))
    else:
        append_to_list_with_versioning("swarms", swarm_id, "swarm_operation_ids", swarm_operation_id)
    
    swarm_operation_queue.task_done()
    return None

async def spawn_swarm_root(swarm_id: str, goal: str):
    '''
    Begin the process of spawning a swarm by creating and executing the root node
    '''
    swarm_config = get_swarm_config()
    swarmstar = Swarmstar(swarm_config)
    
    # This operation spawns the root node and returns the set of route
    # action spawn operations with subdirectives derived from your goal
    root_swarm_operation = swarmstar.spawn_root(goal)
    await swarm_operation_queue.put((swarm_id, root_swarm_operation))
