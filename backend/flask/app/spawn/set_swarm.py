from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os
import traceback

from utils.mongodb import get_kv, update_kv, clean

app = Flask(__name__)
routes = Blueprint('set_swarm_route', __name__)

@routes.route('/spawn/set_swarm', methods=['GET'])
@jwt_required()
@cross_origin()
def set_swarm():
    try:        
        swarm_id = request.args.get('swarm_id', None)
        user_id = get_jwt_identity()

        if not swarm_id:
            return jsonify({"error": "Swarm ID is required"}), 400

        user = get_kv('users', user_id)
        swarm_ids = user['swarm_ids']
        
        if swarm_id == '':
            swarm = {
                "name": "",
                "goal": "",
                "spawned": False,
                "active": False,
                "chat_ids": [],
                "chat_names": {},
                "live_chat_ids": [],
                "terminated_chat_ids": [],
                "nodes": [],
                "root_node_id": None,
                "frames": 0
            }
        else:
            if swarm_id not in swarm_ids:
                return jsonify({"error": "User is not part of the swarm"}), 403
            swarm = get_kv('swarms', swarm_id)
            
        user['current_swarm_id'] = swarm_id
        update_kv('users', user_id, user)
        clean(swarm)
        clean(user)
        return jsonify({'swarm': swarm, 'user': user}), 200
    
    except Exception as e:
        print(traceback.format_exc())
        print(e)
        return jsonify({"error": str(e)}), 500