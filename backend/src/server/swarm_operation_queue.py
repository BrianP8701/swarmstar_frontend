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
    send_swarm_update_to_ui,
    update_node_status_in_ui,
    is_user_online,
    is_user_in_swarm,
    is_user_in_chat,
    append_message_to_chat_in_ui,
    add_new_nodes_to_tree_in_ui
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
    try:
        if operation.operation_type == "user_communication":
            handle_swarm_message(swarm_id, operation)
        else:
            next_operations = execute_swarmstar_operation(get_swarm_config(swarm_id), operation)
            if next_operations:
                for next_operation in next_operations:
                    swarm_operation_queue.put_nowait((swarm_id, next_operation))
        
        print("\n\nSwarm operation executed. Updating UI...\n\n")
        update_ui_after_swarm_operation(swarm_id, operation.id)
        
    except Exception as e:
        print(f"\n\n\nError in execute_swarm_operation:\n{e}\n\n\n")
    finally:
        swarm_operation_queue.task_done()


def update_ui_after_swarm_operation(swarm_id: str, operation_id: str) -> None:
    """
    Call this after executing a swarm operation to update the UI
    in real time if the user is using the interface.
    """
    try:
        swarm_config = get_swarm_config(swarm_id)
        swarm_operation = get_swarm_operation(swarm_config, operation_id)
        user_id = get_user_swarm(swarm_id).owner
        swarm_operation_type = swarm_operation.operation_type
        
        print(f"Updating UI after swarm operation: {swarm_operation_type}")
        if is_user_online(user_id):
            print(f"User {user_id} is online")
            if is_user_in_swarm(user_id, swarm_id):
                print(f"User {user_id} is in swarm {swarm_id}")
                
                update_node_status_in_ui(swarm_id, swarm_operation)
                if swarm_operation_type == "user_communication" and \
                is_user_in_chat(user_id, swarm_operation.node_id):
                    append_message_to_chat_in_ui(swarm_id, swarm_operation.message_id)
                elif swarm_operation_type == "spawn":
                    send_swarm_update_to_ui(swarm_id)
                    add_new_nodes_to_tree_in_ui(swarm_id, swarm_operation)
                elif swarm_operation_type == "terminate":
                    send_swarm_update_to_ui(swarm_id)
                    if does_chat_exist(swarm_operation.node_id):
                        terminate_chat(swarm_id, swarm_operation.node_id)

    except Exception as e:
        print('Error in update_ui_after_swarm_operation:\n', e)
        raise e
