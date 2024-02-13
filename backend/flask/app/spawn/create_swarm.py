from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os

from utils.database import add_to_kv_store, get_from_kv_store, delete_from_kv_store
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
        
        user_info_db_path = os.getenv('USER_INFO_DB_PATH')
        swarms_db_path = os.getenv('SWARMS_DB_PATH')
        
        if not user_info_db_path or not swarms_db_path:
            return jsonify({"error": "Database paths are not configured"}), 500
        
        user_swarms = get_from_kv_store(user_info_db_path, user_id)
        if not user_swarms:
            return jsonify({"error": "User not found"}), 404
        
        swarm_id = generate_uuid(new_swarm_name)
        
        user_swarms['swarm_ids'].append(swarm_id)
        user_swarms['swarm_names'][swarm_id] = new_swarm_name
        delete_from_kv_store(user_info_db_path, user_id)
        add_to_kv_store(user_info_db_path, user_id, user_swarms)
         
        swarm_info = {
            'name': new_swarm_name,
            'goal': '',
            'spawned': False,
            'swarm_users': [user_id]
        }
        
        add_to_kv_store(swarms_db_path, swarm_id, swarm_info)
        swarm_info['swarm_id'] = swarm_id
        swarm_info['user_swarms'] = user_swarms
        print(swarm_info)
        return jsonify(swarm_info), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500



    