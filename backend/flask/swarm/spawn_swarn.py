'''
Okay now we need to simulate the swarm 
creating a chat id and sending messages
'''
import time

from app.chat.create_chat import create_chat
# from app.chat.send_message import send_message
from utils.mongodb import get_kv, update_kv, clean
from app import socketio


def spawn_swarm(swarm_id):
    time.sleep(10)
    goal = get_kv('swarms', swarm_id, 'goal')
    
    node_id = '1234'
    first_message = f'hello. swarms are cool. lets help you accomplish ur goal: {goal}'
    message = {
        'role': 'gpt4',
        'content': first_message
    }
    
    create_chat(swarm_id, node_id, message, 'testinggg boom. chat name')
    
    pass


