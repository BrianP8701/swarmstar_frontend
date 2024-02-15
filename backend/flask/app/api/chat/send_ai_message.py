from flask import current_app

from utils.mongodb import get_kv, update_kv, add_kv, clean

def send_ai_message(chat_id, message_id, message):
    message = {
        'role': 'gpt4',
        'content': message
    }
    chat = get_kv('swarm_chats', chat_id)
    chat['messages'].append(message_id)
    update_kv('swarm_chats', chat_id, chat)
    add_kv('swarm_messages', message_id, message)
    
    socketio = current_app.extensions['socketio']
    socketio.emit('new_ai_message', {'chat_id': chat_id, 'message': message})
