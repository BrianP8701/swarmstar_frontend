import asyncio

from app.utils.mongodb import get_kv, update_kv, add_kv, clean
from app.api.websocket_manager import manager

def create_chat(swarm_id, node_id, chat_name):
    username = swarm['owner']
    swarm = get_kv('swarms', swarm_id)
    swarm['chat_ids'].append(node_id)
    swarm['chat_names'][node_id] = chat_name
    swarm['live_chat_ids'].append(node_id)
    update_kv('swarms', swarm_id, swarm)
    swarm_chat = {
        'chat_messages': [],
        'alive': True,
        'owner': username
    }
    add_kv('swarm_chats', node_id, swarm_chat)
    
    websocket_event = {
        'event': 'create_chat',
        'data': {'chat_id': node_id, 'swarm': clean(swarm)}
    }
    asyncio.run(manager.send_personal_message(websocket_event, username))
