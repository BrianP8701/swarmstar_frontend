"""
The swarm operation queue processes swarm operations of
active swarms.

When transitioning to a cloud-based backend, we'll
replace this with a message queue.
"""
import asyncio

from swarmstar.types import SwarmOperation
from swarmstar import execute_swarmstar_operation

from src.server.communication.handle_swarm_message import handle_swarm_message
from src.utils.database import (
    get_user_swarm,
    append_queued_swarm_operation,
    get_swarm_config,
    get_swarm_operation,
    does_chat_exist,
    terminate_chat
)
from src.server.ui_updates import (
    update_user_swarm_in_ui,
    add_node_to_tree_in_ui
    )

swarm_operation_queue = asyncio.Queue()


async def swarm_operation_queue_worker():
    """
    Execute any swarm operations that are queued up.
    Queue the operation if the swarm is inactive.
    """
    while True:
        try:
            swarm_id, operation = await swarm_operation_queue.get()
            swarm = get_user_swarm(swarm_id)
            if swarm.active:
                asyncio.create_task(
                    execute_swarm_operation(swarm_id, operation)
                )
            else:
                append_queued_swarm_operation(swarm_id, operation.id)
                swarm_operation_queue.task_done()
        except Exception as e:
            print("\n\n\n Error in swarm_operation_queue_worker:\n")
            print(e)
            print("\n\n\n")
            swarm_operation_queue.task_done()
            continue


async def execute_swarm_operation(swarm_id: str, operation: SwarmOperation):
    """
    Some blocking operations need custom handling in the backend.
    This function will appropriately handle swarm operations.
    """
    print(f"Executing operation \n\n{operation}\n\n for swarm {swarm_id}")
    try:
        if operation.operation_type == "user_communication":
            print("\n\n\nwe are calling handle_swarm_message\n\n\n")
            handle_swarm_message(swarm_id, operation)
        else:
            swarm_config = get_swarm_config(swarm_id)
            next_operations = execute_swarmstar_operation(swarm_config, operation)
            update_after_executing_swarm_operation(swarm_id, operation.id)
            update_user_swarm_in_ui(swarm_id)
            for next_operation in next_operations:
                swarm_operation_queue.put_nowait((swarm_id, next_operation))
    except Exception as e:
        print("\n\n\n Error in execute_swarm_operation:\n")
        print(e)
        print("\n\n\n")
    finally:
        swarm_operation_queue.task_done()


def update_after_executing_swarm_operation(swarm_id: str, operation_id: str) -> None:
    """
    Call this after executing a swarm operation.
    """
    try:
        swarm_config = get_swarm_config(swarm_id)
        swarm_operation = get_swarm_operation(swarm_config, operation_id)
        
        if swarm_operation.operation_type == "terminate":
            if does_chat_exist(swarm_operation.node_id):
                terminate_chat(swarm_id, swarm_operation.node_id)
        elif swarm_operation.operation_type == "spawn":
            add_node_to_tree_in_ui(swarm_id, swarm_operation.node_id)
    except Exception as e:
        print('Error in update_after_executing_swarm_operation:\n', e)
        raise e
