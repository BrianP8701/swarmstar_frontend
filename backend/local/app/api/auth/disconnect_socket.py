from flask_socketio import disconnect

from app import socketio

@socketio.on('some_event')
def handle_some_event(data):
    if data:
        disconnect()