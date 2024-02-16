import asyncio

from app.utils.mongodb import get_kv, update_kv, add_kv
from app.api.websocket_manager import manager
from app.utils.security.uuid import generate_uuid

def ai_message(node_id, message):
    chat = get_kv('swarm_chats', node_id)
    username = chat['owner']
    message_id = generate_uuid('message')
    
    chat['messages'].append(message_id)
    update_kv('swarm_chats', node_id, chat)
    add_kv('swarm_messages', message_id, message)
    
    websocket_event = {
        'event': 'ai_message',
        'data': {'chat_id': node_id, 'message': message}
    }
    
    print('sending ai message event')
    asyncio.run(manager.send_personal_message(websocket_event, username))
    