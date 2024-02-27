import asyncio

swarm_operation_queue = asyncio.Queue()

async def swarm_operation_queue_worker():
    while True:
        operation, swarm_id = await swarm_operation_queue.get()
        # Implement your processing logic here
        print(f"Processing operation {operation} for swarm_id {swarm_id}")
        await asyncio.sleep(1)  # Simulate some processing time
        swarm_operation_queue.task_done()
