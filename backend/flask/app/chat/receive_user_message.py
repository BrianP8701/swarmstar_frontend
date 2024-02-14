from flask import Blueprint
from flask_socketio import disconnect

from app import socketio

@socketio.on('message')
def handle_message(data):
    print('received message:', data)



# Example of disconnecting a socket
@socketio.on('some_event')
def handle_some_event(data):
    if data:
        disconnect()
