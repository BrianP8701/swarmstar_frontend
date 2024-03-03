"""
The swarm operation queue processes swarm operations of
active swarms.

When transitioning to a cloud-based backend, we'll
replace this with a message queue.
"""
import asyncio

from swarmstar.swarm.types import SwarmOperation
from swarmstar import execute_swarmstar_operation

from backend.src.server.communication.start_chat_with_user import start_chat_with_user
from src.utils.database import get_user_swarm, append_queued_swarm_operation, get_swarm_config, get_swarm_operation
from src.server.ui_updates import update_swarm_state_in_ui

swarm_operation_queue = asyncio.Queue()

async def swarm_operation_queue_worker():
    """
    Execute any swarm operations that are queued up.
    Queue the operation if the swarm is inactive.
    """
    while True:
        swarm_id, operation_id = await swarm_operation_queue.get()
        swarm = get_user_swarm(swarm_id)
        
        if swarm['active']:
            asyncio.create_task(execute_swarm_operation(swarm_id, get_swarm_operation(operation_id)))
        else:
            append_queued_swarm_operation(swarm_id, operation_id)
            swarm_operation_queue.task_done()

def execute_swarm_operation(swarm_id: str, operation: SwarmOperation):
    '''
    Some blocking operations need custom handling in the backend.
    This function will appropriately handle swarm operations.
    '''
    if operation.operation_type == 'user_communication':
        start_chat_with_user(swarm_id, operation)
    else:
        swarm_config = get_swarm_config("default_config")
        next_operations = execute_swarmstar_operation(swarm_config, operation)
        update_swarm_state_in_ui(swarm_id, operation.node_id)
        for next_operation in next_operations:
            swarm_operation_queue.put_nowait((swarm_id, next_operation.id))

    swarm_operation_queue.task_done()
