from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os
import traceback

from utils.database import add_to_kv_store, get_from_kv_store, delete_from_kv_store

app = Flask(__name__)
routes = Blueprint('spawn_swarm_route', __name__)

@routes.route('/spawn/spawn_swarm', methods=['PUT'])
@jwt_required()
@cross_origin()
def spawn_swarm():
    try:
        user_id = get_jwt_identity()
        swarm_id = request.json.get('swarm_id', None)
        goal = request.json.get('goal', None)
        
        if not swarm_id:
            return jsonify({"error": "Swarm ID is required"}), 400
        
        if not goal:
            return jsonify({"error": "Swarm goal is required"}), 400
        
        user_info_db_path = os.getenv('USER_INFO_DB_PATH')
        swarms_db_path = os.getenv('SWARMS_DB_PATH')
        
        if not user_info_db_path or not swarms_db_path:
            return jsonify({"error": "Database paths are not configured"}), 500

        user_info = get_from_kv_store(user_info_db_path, user_id)
        user_swarms = user_info['swarm_ids']
        if swarm_id not in user_swarms:
            return jsonify({"error": "User is not part of the swarm"}), 403
        
        swarm_info = get_from_kv_store(swarms_db_path, swarm_id)
        swarm_info['spawned'] = True
        swarm_info['goal'] = goal
        
        # TODO Actually spawn the swarm
        
        delete_from_kv_store(swarms_db_path, swarm_id)
        add_to_kv_store(swarms_db_path, swarm_id, swarm_info)
        
        return jsonify(swarm_info), 200
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500