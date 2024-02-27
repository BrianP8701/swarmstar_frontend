import asyncio

from app.utils.mongodb import get_kv, update_kv, add_kv, append_to_list_with_versioning
from backend.local.app.api.websocket.websocket_manager import manager
from app.utils.security.uuid import generate_uuid

def ai_message(node_id, message):
    chat = get_kv('swarm_chats', node_id)
    user = get_kv('users', chat['owner'])
    username = chat['owner']
    user_id = user['user_id']
    user_profile = get_kv('user_profiles', user_id)
    message_id = generate_uuid('message')
    
    append_to_list_with_versioning('swarm_chats', node_id, 'message_ids', message_id)
    
    if user_profile['current_chat_id'] == node_id:
        websocket_event = {
            'event': 'ai_message',
            'data': {'message': message}
        }
        print('sending ai message event')
        asyncio.run(manager.send_personal_message(websocket_event, username))
