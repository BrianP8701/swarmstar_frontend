from swarmstar.swarm.types import  BlockingOperation

from src.server.swarm_operation_queue import swarm_operation_queue
from src.types import SwarmMessage
from src.utils.database import get_chat, get_message, update_chat

async def swarm_handle_user_message(swarm_id: str, node_id: str, message_id: str):
    chat = get_chat(node_id)
    message = get_message(message_id)

    user_communication_operation = chat['user_communication_operation']
    
    return_operation = BlockingOperation(
        node_id=chat.id,
        blocking_type='internal_action',
        args={'user_response': message.content},
        context=user_communication_operation.context,
        next_function_to_call=user_communication_operation.next_function_to_call
    )
    
    update_chat(chat.id, {'user_communication_operation': None})
    await swarm_operation_queue.put((swarm_id, return_operation))
