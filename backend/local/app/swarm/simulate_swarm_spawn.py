'''
Okay now we need to simulate the swarm 
creating a chat id and sending messages
'''
import time
import asyncio

from app.api.websocket_manager import manager
from app.utils.mongodb import get_kv
from app.api.chat.ai_message import ai_message
from app.api.chat.create_chat import create_chat
from app.api.chat.ai_message import ai_message

def simulate_swarm_spawn(swarm_id: str):
    print('we are in the simulation')
    swarm = get_kv('swarms', swarm_id)
    goal = swarm['goal']
    node_id = '1234'
    first_message = {
        'role': 'gpt4',
        'content': f'hello. swarms are cool. lets help you accomplish ur goal: {goal}'
    }

    # Assuming you have the client_id or if broadcasting to all connected clients
    create_chat(swarm_id, node_id, 'first conversation')    
    ai_message(node_id, first_message)   
    
    node_id = '5678'
    second_message = {
        'role': 'gpt4',
        'content': f'hello. swarms are super cool. lets help you accomplish ur goal: {goal}'
    }
     
    create_chat(swarm_id, node_id, 'second conversation')
    ai_message(node_id, second_message)
    