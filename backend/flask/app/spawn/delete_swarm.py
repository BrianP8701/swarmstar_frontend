from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os
import traceback

from utils.database import add_to_kv_store, get_from_kv_store, delete_from_kv_store

app = Flask(__name__)
routes = Blueprint('delete_swarm_route', __name__)

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

        user_swarms = get_from_kv_store(user_info_db_path, user_id)
        if swarm_id not in user_swarms['swarm_ids']:
            return jsonify({"error": "User is not part of the swarm"}), 403
        
        user_swarms['swarm_ids'].remove(swarm_id)
        user_swarms['swarm_names'].pop(swarm_id)
        delete_from_kv_store(user_info_db_path, user_id)
        add_to_kv_store(user_info_db_path, user_id, user_swarms)
        
        delete_from_kv_store(swarms_db_path, swarm_id)
        
        return jsonify({'user_swarms': user_swarms}), 200
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500