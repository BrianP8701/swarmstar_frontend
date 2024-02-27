import asyncio

from app.utils.mongodb import get_kv, update_kv, add_kv
from app.fastapi.websocket_manager import manager

def create_chat(swarm_id, node_id, chat_name):
    swarm = get_kv('swarms', swarm_id)
    username = swarm['owner']
    swarm = get_kv('swarms', swarm_id)
    swarm['chat_ids'][node_id] = chat_name
    swarm['live_chat_ids'].append(node_id)
    update_kv('swarms', swarm_id, swarm)
    swarm_chat = {
        'message_ids': [],
        'alive': True,
        'node_id': node_id,
        'owner': username
    }
    add_kv('swarm_chats', node_id, swarm_chat)
    
    websocket_event = {
        'event': 'create_chat',
        'data': {'swarm': swarm}
    }
    
    print('sending create chat event')
    asyncio.run(manager.send_personal_message(websocket_event, username))
