from app import socketio

def send_message(message):
    # This function can be triggered by some internal logic
    message = {
        'role': 'gpt4',
        'content': message
    }
    socketio.emit('ai_message', {'data': message})

