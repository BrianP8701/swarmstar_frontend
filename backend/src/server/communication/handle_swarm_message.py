from swarmstar.types import UserCommunicationOperation

from src.utils.database import (
    does_chat_exist,
    create_empty_chat,
    create_swarm_message,
    update_chat,
)
from src.server.ui_updates import (
    update_user_swarm_in_ui,
    add_message_to_swarm_chat_in_ui,
)
from src.types import SwarmMessage


def handle_swarm_message(
    swarm_id: str, user_comm_operation: UserCommunicationOperation
):
    node_id = user_comm_operation.node_id

    if not does_chat_exist(node_id):
        create_empty_chat(swarm_id, user_comm_operation.node_id)

    message: str = user_comm_operation.message
    message = SwarmMessage(role="ai", content=message)
    create_swarm_message(node_id, message)
    update_chat(node_id, {"user_communication_operation": user_comm_operation})

    update_user_swarm_in_ui(swarm_id)
    add_message_to_swarm_chat_in_ui(swarm_id, node_id, message.id)
