from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from utils.mongodb import add_kv, get_kv, update_kv, clean
from utils.security import generate_uuid

app = Flask(__name__)
routes = Blueprint('create_swarm_route', __name__)

@routes.route('/spawn/create_swarm', methods=['POST'])
@jwt_required()
@cross_origin()
def create_swarm():
    try:
        user_id = get_jwt_identity()
        new_swarm_name = request.json.get('swarm_name', None)
        
        if not new_swarm_name:
            print('swarm name is required')
            return jsonify({"error": "Swarm name is required"}), 400
        
        user = get_kv('users', user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        swarm_id = generate_uuid(new_swarm_name)
        
        user['swarm_ids'].append(swarm_id)
        user['swarm_names'][swarm_id] = new_swarm_name
        user['current_swarm_id'] = swarm_id
        update_kv('users', user_id, user)
         
        new_swarm = {
            'name': new_swarm_name,
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
        
        add_kv('swarms', swarm_id, new_swarm)
        clean(new_swarm)
        clean(user)
        return jsonify({'swarm': new_swarm, 'user': user}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
