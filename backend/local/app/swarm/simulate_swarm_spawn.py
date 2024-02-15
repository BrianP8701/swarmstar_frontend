'''
Okay now we need to simulate the swarm 
creating a chat id and sending messages
'''
import time
import asyncio

from app.websocket_manager import manager
from app.utils.mongodb import get_kv

def simulate_swarm_spawn(swarm_id: str, username: str):
    time.sleep(5)  # Consider replacing with async sleep if this becomes async
    goal = get_kv('swarms', swarm_id, 'goal')
    
    chat_id = '1234'
    first_message = f'hello. swarms are cool. lets help you accomplish ur goal: {goal}'
    
    websocket_event = {
        "event": "new_ai_message",
        "data": {
            "chat_id": chat_id,
            "message": {
                "role": "gpt4",
                "content": first_message
            }
        }
    }
    
    # Assuming you have the client_id or if broadcasting to all connected clients
    asyncio.run(manager.send_personal_message(websocket_event, username))
