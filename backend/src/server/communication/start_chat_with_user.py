import asyncio

from swarmstar.swarm.types import UserCommunicationOperation

from src.utils.database import create_empty_chat, create_swarm_message, update_chat
from src.server.ui_updates import update_user_swarm_in_ui
from src.types import SwarmMessage

def start_chat_with_user(swarm_id: str, user_comm_operation: UserCommunicationOperation):
    chat = create_empty_chat(swarm_id, user_comm_operation.node_id)
    message: str = user_comm_operation.args["message"]
    message = SwarmMessage(
        role="ai",
        content=message
    )
    
    create_swarm_message(chat.id, message)
    update_chat(chat.id, {
        "user_communication_operation": user_comm_operation
    })

    update_user_swarm_in_ui(swarm_id)
