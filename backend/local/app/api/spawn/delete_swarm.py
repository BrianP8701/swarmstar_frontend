from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import traceback

from app.utils.mongodb import get_kv, delete_kv, update_kv, clean
from app.utils.type_operations import backend_user_to_frontend_user

app = Flask(__name__)
delete_swarm_route = Blueprint('delete_swarm', __name__)

@delete_swarm_route.route('/spawn/delete_swarm', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_swarm():
    try:
        username = get_jwt_identity()
        swarm_id = request.json.get('swarm_id', None)
        
        if not swarm_id:
            return jsonify({"error": "Swarm ID is required"}), 400

        user = get_kv('users', username)
        if swarm_id not in user['swarm_ids']:
            return jsonify({"error": "User is not part of the swarm"}), 403
                
        swarm = get_kv('swarms', swarm_id)
        print(swarm)
        chat_ids = swarm['chat_ids']
        
        for chat_id in chat_ids:
            chat = get_kv('chats', chat_id)
            for message_id in chat['message_ids']:
                delete_kv('swarm_messages', message_id)
            delete_kv('chats', chat_id)
            
        for node_id in swarm['nodes']:
            delete_kv('nodes', node_id)
            
        for i in range (swarm['frames']):
            delete_kv('swarm_events', f'{swarm_id}_history_{i}')
        
        delete_kv('swarms', swarm_id)
        
        user['swarm_ids'].remove(swarm_id)
        user['swarm_names'].pop(swarm_id)
        update_kv('users', username, user)
        
        empty_swarm = {
            'name': '',
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': [],
            'chat_names': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'nodes': [],
            'root_node_id': None,
            'frames': 0
        }
        clean(user)
        clean(empty_swarm)
        return jsonify({'user': backend_user_to_frontend_user(user), 'swarm': empty_swarm}, ), 200
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500