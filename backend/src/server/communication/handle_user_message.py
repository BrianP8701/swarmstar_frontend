
from swarmstar.swarm.types import  BlockingOperation

from client.utils.mongodb import get_kv
from client.utils.mongodb import get_kv, add_kv
from backend.local.server.utils.uuid import generate_uuid
from server.swarm_operation_queue import swarm_operation_queue

async def handle_user_message(swarm_id: str, node_id: str, message: dict):
    try:
        chat = get_kv('swarm_chats', chat_id)
    except:
        raise ValueError(f"Chat with ID {chat_id} not found")
    
    user_communication_operation = chat['user_communication_operation']
    message_id = generate_uuid('message')
    add_kv('swarm_messages', message_id, message)
    
    return_operation = BlockingOperation(
        node_id=chat['node_id'],
        blocking_type='internal_action',
        args={'user_response': message['content']},
        context=user_communication_operation.context,
        next_function_to_call=user_communication_operation.next_function_to_call
    )
    
    await swarm_operation_queue.put((chat['swarm_id'], return_operation))
    
