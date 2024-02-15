from flask import request
from flask_socketio import disconnect
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import socketio

@socketio.on('some_event')
def handle_some_event(data):
    if data:
        disconnect()