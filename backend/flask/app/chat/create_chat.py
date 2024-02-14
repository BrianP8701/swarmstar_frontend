from flask import Flask, Blueprint
from flask_sse import sse

from utils.mongodb import get_kv, update_kv, clean

app = Flask(__name__)
routes = Blueprint(sse, 'create_chat_route',  __name__, url_prefix='/chat/create_chat')

def create_chat(swarm_id, chat_id, message, chat_name):
    swarm = get_kv('swarms', swarm_id)
    swarm['chat_ids'].append(chat_id)
    swarm['chat_names'][chat_id] = chat_name
    swarm['live_chat_ids'].append(chat_id)
    update_kv('swarms', swarm_id, swarm)
    sse.publish({'message': message, 'swarm': swarm})
