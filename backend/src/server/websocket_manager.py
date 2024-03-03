"""
This is responsible for sending messages to clients over
websocket connections to update the UI.
"""
from typing import Dict
from fastapi import WebSocket
from pydantic import BaseModel


class WebsocketEvent(BaseModel):
    type: str
    data: dict


"""
type: "update_swarm"
data: {swarm: UserSwarm}

type: "append_message_to_chat"
data: {message: SwarmMessage} 
"""


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    def is_connected(self, user_id: str) -> bool:
        return user_id in self.active_connections

    async def send_personal_message(
        self, websocket_event: WebsocketEvent, user_id: str
    ):
        """
        Client id is username
        """
        if user_id in self.active_connections:
            websocket = self.active_connections[user_id]
            await websocket.send_json(websocket_event.model_dump())

    async def broadcast(self, message: dict):
        for connection in self.active_connections.values():
            await connection.send_json(message)


manager = ConnectionManager()
