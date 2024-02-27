from app.utils.mongodb import get_kv

def get_frontend_chat(chat_id):
    chat = get_kv('swarm_chats', chat_id)
    messages = []
    for message_id in chat['message_ids']:
        message = get_kv('swarm_messages', message_id)
        messages.append(message)
    chat.pop('message_ids', None)
    chat['messages'] = messages
    return chat