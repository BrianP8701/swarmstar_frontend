import asyncio

from swarmstar.swarm.types import UserCommunicationOperation

from client.utils.mongodb import get_kv, append_to_list_with_versioning
from server.websocket_manager import manager
from client.utils.mongodb import get_kv, add_kv, append_to_list_with_versioning, update_kv
from backend.local.server.utils.uuid import generate_uuid


def send_user_message(swarm_id: str, operation: UserCommunicationOperation):
    message: str = operation.args["message"]
    user_id = get_kv('swarms', swarm_id)['owner']
    username = get_kv('users', user_id)['username']
    try:
        chat = get_kv('swarm_chats', operation.node_id)
    except:
        chat = {
            'swarm_id': swarm_id,
            'message_ids': [],
            'alive': True,
            'node_id': operation.node_id,
            'owner': user_id
        }
        add_kv('swarm_chats', operation.node_id, chat)
    
    message_id = generate_uuid('message')
    add_kv('swarm_messages', message_id, {'role': 'ai', 'message': message})
    append_to_list_with_versioning('swarm_chats', operation.node_id, 'message_ids', message_id)
    update_kv('swarm_chats', operation.node_id, {'user_communication_operation': operation.model_dump()})
    
    user_profile = get_kv('user_profiles', user_id)
    if user_profile['current_chat_id'] == operation.node_id:
        websocket_event = {
            'event': 'ai_message',
            'data': {'message': message}
        }
        asyncio.run(manager.send_personal_message(websocket_event, username))