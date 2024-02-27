import asyncio

from app.utils.mongodb import get_kv
from app.swarmstar_api.core import execute_swarm_operation

swarm_operation_queue = asyncio.Queue()

async def swarm_operation_queue_worker():
    '''
    This queue constantly processes swarm operations while the application is running.
    
    It makes sure the swarm_id is active. If so, it will process the operation.
    Otherwise it will persist the operation in MongoDB to be processed later.
    '''
    while True:
        operation, swarm_id = await swarm_operation_queue.get()
        swarm = get_kv('swarms', swarm_id)
        if swarm['active']:
            await execute_swarm_operation(operation, swarm_id)
        print(f"Processing operation {operation} for swarm_id {swarm_id}")
        await asyncio.sleep(1)  # Simulate some processing time
        swarm_operation_queue.task_done()
