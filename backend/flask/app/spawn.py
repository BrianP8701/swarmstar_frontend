from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os

from utils.database import add_to_kv_store, get_from_kv_store, delete_from_kv_store
from utils.security import generate_uuid

app = Flask(__name__)
routes = Blueprint('spawn_routes', __name__)

@routes.route('/spawn/create_swarm', methods=['POST'])
@jwt_required()
@cross_origin()
def create_swarm():
    try:
        user_id = get_jwt_identity()
        new_swarm_name = request.json.get('swarm_name', None)
        
        if not new_swarm_name:
            return jsonify({"error": "Swarm name is required"}), 400
        
        user_info_db_path = os.getenv('USER_INFO_DB_PATH')
        swarms_db_path = os.getenv('SWARMS_DB_PATH')
        
        if not user_info_db_path or not swarms_db_path:
            return jsonify({"error": "Database paths are not configured"}), 500
        
        user_info = get_from_kv_store(user_info_db_path, user_id)
        if not user_info:
            return jsonify({"error": "User not found"}), 404
        
        swarm_id = generate_uuid(new_swarm_name)
        
        user_info['user_swarms'].append(swarm_id)
        user_info['swarm_names'][swarm_id] = new_swarm_name
        add_to_kv_store(user_info_db_path, user_id, user_info)
        
        swarm_info = {
            'swarm_name': new_swarm_name,
            'swarm_goal': '',
            'spawned': False,
            'swarm_users': [user_id]
        }
        
        add_to_kv_store(swarms_db_path, swarm_id, swarm_info)
        swarm_info['swarm_id'] = swarm_id
        
        return jsonify(swarm_info), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route('/spawn/delete_swarm', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_swarm():
    try:
        user_id = get_jwt_identity()
        swarm_id = request.json.get('swarm_id', None)
        
        if not swarm_id:
            return jsonify({"error": "Swarm ID is required"}), 400
        
        user_info_db_path = os.getenv('USER_INFO_DB_PATH')
        swarms_db_path = os.getenv('SWARMS_DB_PATH')
        
        if not user_info_db_path or not swarms_db_path:
            return jsonify({"error": "Database paths are not configured"}), 500

        user_info = get_from_kv_store(user_info_db_path, user_id)
        user_swarms = user_info['user_swarms']
        if swarm_id not in user_swarms:
            return jsonify({"error": "User is not part of the swarm"}), 403
        
        user_swarms.remove(swarm_id)
        user_info['user_swarms'] = user_swarms
        delete_from_kv_store(user_info_db_path, user_id)
        add_to_kv_store(user_info_db_path, user_id, user_info)
        
        delete_from_kv_store(swarms_db_path, swarm_id)
        
        return jsonify({"message": "Swarm deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@routes.route('/spawn/start_swarm', methods=['POST'])
@jwt_required()
@cross_origin()
def start_swarm():
    try:
        user_id = get_jwt_identity()
        swarm_id = request.json.get('swarm_id', None)
        swarm_goal = request.json.get('swarm_goal', None)
        
        if not swarm_id:
            return jsonify({"error": "Swarm ID is required"}), 400
        
        if not swarm_goal:
            return jsonify({"error": "Swarm goal is required"}), 400
        
        user_info_db_path = os.getenv('USER_INFO_DB_PATH')
        swarms_db_path = os.getenv('SWARMS_DB_PATH')
        
        if not user_info_db_path or not swarms_db_path:
            return jsonify({"error": "Database paths are not configured"}), 500

        user_info = get_from_kv_store(user_info_db_path, user_id)
        user_swarms = user_info['user_swarms']
        if swarm_id not in user_swarms:
            return jsonify({"error": "User is not part of the swarm"}), 403
        
        swarm_info = get_from_kv_store(swarms_db_path, swarm_id)
        swarm_info['spawned'] = True
        swarm_info['swarm_goal'] = swarm_goal
        delete_from_kv_store(swarms_db_path, swarm_id)
        add_to_kv_store(swarms_db_path, swarm_id, swarm_info)
        
        return jsonify({}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500