"""
These are UI updates that are pushed from the swarm to the user's UI.
"""
import asyncio

from swarmstar.types import SwarmOperation, SwarmNode

from src.utils.database import (
    get_user, 
    get_user_swarm, 
    get_message, 
    get_swarm_config,
    get_swarm_node
)
from src.server.websocket_manager import manager


def is_user_online(user_id: str) -> bool:
    return manager.is_connected(user_id)

def is_user_in_swarm(user_id: str, swarm_id: str) -> bool:
    print("\n\n\n\nswarm_id vs current_swarm_id")
    print(swarm_id, user_id, get_user(user_id).current_swarm_id)
    print('\n\n\n\n')
    return get_user(user_id).current_swarm_id == swarm_id

def is_user_in_chat(user_id: str, chat_id: str) -> bool:
    return get_user(user_id).current_chat_id == chat_id

def send_swarm_update_to_ui(swarm_id: str) -> None:
    """
    After any change to the UserSwarm, send the updated UserSwarm to the UI.
    """
    try:
        user_id = get_user_swarm(swarm_id).owner
        asyncio.create_task(
            manager.send_personal_message(
                {
                    "type": "update_swarm",
                    "data": {"swarm": get_user_swarm(swarm_id).model_dump()},
                },
                user_id,
            )
        )
    except Exception as e:
        raise e

def append_message_to_chat_in_ui(swarm_id: str, message_id: str) -> None:
    """
    After an ai message is created, append it to the chat in the UI.
    """
    try:
        user_id = get_user_swarm(swarm_id).owner
        asyncio.create_task(
            manager.send_personal_message(
                {
                    "type": "append_message_to_chat",
                    "data": {"message": get_message(message_id).model_dump()},
                },
                user_id,
            )
        )
    except Exception as e:
        raise e


def add_new_nodes_to_tree_in_ui(swarm_id: str, swarm_operation: SwarmOperation) -> None:
    """
    After a spawn operation, add the new nodes to the tree in the UI.
    """
    try:
        user_id = get_user_swarm(swarm_id).owner
        swarm_config = get_swarm_config(swarm_id)
        parent_id = swarm_operation.node_id
        parent_node = get_swarm_node(swarm_config, parent_id)
        
        for node_id in parent_node.children_ids:
            node = get_swarm_node(swarm_config, node_id)
            add_node_payload = {
                "parent_node_id" : parent_id,
                "new_node": {
                    "name": node.name,
                    "attributes": {
                        "directive": node.message,
                        "node_id": node.id,
                        "status": "active"
                    }
                }
            }
            asyncio.create_task(
                manager.send_personal_message(
                    {
                        "type": "add_node_to_tree",
                        "data": add_node_payload,
                    },
                    user_id
                )
            )
    except Exception as e:
        raise e


def update_node_status_in_ui(swarm_id: str, operation: SwarmOperation) -> None:
    try:
        user_id = get_user_swarm(swarm_id).owner
        operation_type = operation.operation_type
        node_id = operation.node_id
        if operation_type == "spawn":
            asyncio.create_task(
                manager.send_personal_message(
                    {
                        "type": "update_node_status",
                        "data": {"node_id": node_id, "status": "waiting"},
                    },
                    user_id,
                )
            )
        elif operation_type == "terminate":
            asyncio.create_task(
                manager.send_personal_message(
                    {
                        "type": "update_node_status",
                        "data": {"node_id": node_id, "status": "terminated"},
                    },
                    user_id
                )
            )
    except Exception as e:
        raise e
