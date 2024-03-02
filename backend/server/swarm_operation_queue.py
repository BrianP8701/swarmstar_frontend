"""
This module is responsible for handling the swarm operation queue.
"""
import asyncio
import os
from dotenv import load_dotenv

from swarmstar import Swarmstar
from swarmstar.swarm.types import SwarmConfig, SwarmOperation

from server.communication.send_user_message import send_user_message
from client.utils.mongodb import get_kv, add_kv, append_to_list_with_versioning
from backend.local.server.utils.uuid import generate_uuid

swarm_operation_queue = asyncio.Queue()



async def swarm_operation_queue_worker():
    """
    This worker constantly processes swarm operations while the swarm 
    is active. If the swarm is not active, the operation is queued.
    """
    while True:
        swarm_id, operation = await swarm_operation_queue.get()
        asyncio.create_task(process_swarm_operation(swarm_id, operation))

async def process_swarm_operation(swarm_id: str, operation: SwarmOperation) -> None:
    swarm = get_kv('swarms', swarm_id)
    
    if swarm['active']:
        next_operations = execute_swarm_operation(swarm_id, operation)
        for next_operation in next_operations:
            await swarm_operation_queue.put((swarm_id, next_operation))
    else:
        swarm_operation_id = generate_uuid('swarm_operation')
        add_kv('swarm_operations', swarm_operation_id, operation.model_dump())
        append_to_list_with_versioning("swarms", swarm_id, "queued_swarm_operation_ids", swarm_operation_id)
    
    swarm_operation_queue.task_done()



def execute_swarm_operation(swarm_id: str, operation: SwarmOperation):
    '''
    Some blocking operations need custom handling in the backend.
    This function will appropriately handle swarm operations.
    '''
    if operation.operation_type == 'user_communication':
        send_user_message(swarm_id, operation)
    else:
        swarm_config = get_swarm_config()
        swarmstar = Swarmstar(swarm_config)
        return swarmstar.execute(operation)
