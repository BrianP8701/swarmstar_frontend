import asyncio

from app.utils.mongodb import get_kv, update_kv, add_kv
from app.fastapi.websocket_manager import manager
from app.utils.security.uuid import generate_uuid

def ai_message(node_id, message):
    chat = get_kv('swarm_chats', node_id)
    user = get_kv('users', chat['owner'])
    username = chat['owner']
    user_id = user['user_id']
    user_profile = get_kv('user_profiles', user_id)
    message_id = generate_uuid('message')
    
    chat['message_ids'].append(message_id)
    update_kv('swarm_chats', node_id, chat)
    add_kv('swarm_messages', message_id, message)
    
    if user_profile['current_chat_id'] == node_id:
        websocket_event = {
            'event': 'ai_message',
            'data': {'message': message}
        }
        print('sending ai message event')
        asyncio.run(manager.send_personal_message(websocket_event, username))
