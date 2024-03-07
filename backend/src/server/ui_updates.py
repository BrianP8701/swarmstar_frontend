"""
These are UI updates that are pushed from the swarm to the user's UI.
"""
import asyncio

from src.utils.database import (
    get_user, 
    get_user_swarm, 
    get_message, 
    get_swarm_config,
    get_swarm_node,
)
from src.server.websocket_manager import manager


def is_user_online(user_id: str) -> bool:
    return manager.is_connected(user_id)


def update_user_swarm_in_ui(swarm_id: str) -> None:
    try:
        user_swarm = get_user_swarm(swarm_id)
        if not is_user_online(user_swarm.owner):
            return
        user = get_user(user_swarm.owner)
        
        if user.current_swarm_id == swarm_id:
            asyncio.create_task(
                manager.send_personal_message(
                    {
                        "type": "update_swarm",
                        "data": {"swarm": get_user_swarm(swarm_id).model_dump()},
                    },
                    user_swarm.owner,
                )
            )
    except Exception as e:
        raise e

def add_message_to_swarm_chat_in_ui(
    swarm_id: str, chat_id: str, message_id: str
) -> None:
    try:
        user_swarm = get_user_swarm(swarm_id)
        if not is_user_online(user_swarm.owner):
            return
        user = get_user(user_swarm.owner)

        if user.current_chat_id == chat_id:
            asyncio.create_task(
                manager.send_personal_message(
                    {
                        "type": "append_message_to_chat",
                        "data": {"message": get_message(message_id).model_dump()},
                    },
                    user_swarm.owner,
                )
            )
    except Exception as e:
        raise e



def add_node_to_tree_in_ui(swarm_id: str, node_id: str) -> None:
    try:
        swarm_config = get_swarm_config(swarm_id)
        node = get_swarm_node(swarm_config, node_id)
        parent_id = node.parent_id
        
        add_node_payload = {
            "parentNodeId" : parent_id,
            "newNode": {
                "name": node.name,
                "attributes": {
                    "directive": node.message,
                    "node_id": node.id,
                }
            }
        }
        
        current_swarm_id = get_user(get_user_swarm(swarm_id).owner).current_swarm_id
        if current_swarm_id == swarm_id:
            asyncio.create_task(
                manager.send_personal_message(
                    {
                        "type": "add_node_to_tree",
                        "data": add_node_payload,
                    },
                    get_user_swarm(swarm_id).owner,
                )
            )
    except Exception as e:
        raise e