import asyncio

from app.utils.mongodb import (
    get_kv, add_kv, 
    add_to_dict_with_versioning, 
    append_to_list_with_versioning
    )
from app.api.websocket.websocket_manager import manager

def create_chat(swarm_id, node_id, chat_name):
    swarm = get_kv('swarms', swarm_id)
    username = swarm['owner']
    add_to_dict_with_versioning('swarms', swarm_id, 'chat_ids', node_id, chat_name)
    append_to_list_with_versioning('swarms', swarm_id, 'live_chat_ids', node_id)
    swarm_chat = {
        'message_ids': [],
        'alive': True,
        'node_id': node_id,
        'owner': username
    }
    add_kv('swarm_chats', node_id, swarm_chat)
    
    websocket_event = {
        'event': 'create_chat',
        'data': {'swarm': get_kv('swarms', swarm_id)}
    }
    
    print('sending create chat event')
    asyncio.run(manager.send_personal_message(websocket_event, username))
