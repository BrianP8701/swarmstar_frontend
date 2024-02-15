'''
Okay now we need to simulate the swarm 
creating a chat id and sending messages
'''
import time
from flask import Flask, jsonify, request, Blueprint

from app.api.chat.create_new_chat import create_chat
from app.api.chat.send_ai_message import send_ai_message
from app.utils.mongodb import get_kv, update_kv, clean

app = Flask(__name__)
spawn_swarm_route = Blueprint('spawn_swarm', __name__)

@spawn_swarm_route.route('/internal/spawn_swarm', methods=['POST'])
def simulate_swarm_spawn():
    data = request.get_json()
    time.sleep(5)
    swarm_id = data.get('swarm_id')
    goal = get_kv('swarms', swarm_id, 'goal')
    
    node_id = '1234'
    first_message = f'hello. swarms are cool. lets help you accomplish ur goal: {goal}'
    message = {
        'role': 'gpt4',
        'content': first_message
    }
    
    create_chat(swarm_id, node_id, 'testinggg boom. chat name')
    send_ai_message(message, swarm_id, node_id)
    pass


def internal_spawn_swarm():
    data = request.get_json()
    swarm_id = data.get('swarm_id')
    # Simulate swarm spawning logic here
    return jsonify({"status": "Swarm spawned", "swarm_id": swarm_id}), 200
