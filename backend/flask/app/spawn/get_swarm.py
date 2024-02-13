from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os
import traceback

from utils.database import get_from_kv_store

app = Flask(__name__)
routes = Blueprint('get_swarm_route', __name__)

@routes.route('/spawn/get_swarm', methods=['GET'])
@jwt_required()
@cross_origin()
def get_swarm():
    try:
        print('At least we made it inside the get function in the backend')
        
        # Use request.args for query parameters
        swarm_id = request.args.get('swarm_id', None)
        user_id = get_jwt_identity()

        if not swarm_id:
            empty_swarm_info = {
                'name': '',
                'goal': '',
                'spawned': False,
                'swarm_users': [],
                'swarm_id': ''
            }
            return jsonify(empty_swarm_info), 200

        # Your existing logic for database paths and swarm info retrieval
        user_info_db_path = os.getenv('USER_INFO_DB_PATH')
        swarms_db_path = os.getenv('SWARMS_DB_PATH')
        
        if not user_info_db_path or not swarms_db_path:
            return jsonify({"error": "Database paths are not configured"}), 500

        user_info = get_from_kv_store(user_info_db_path, user_id)
        user_swarms = user_info['swarm_ids']
        
        if swarm_id not in user_swarms:
            return jsonify({"error": "User is not part of the swarm"}), 403

        swarm_info = get_from_kv_store(swarms_db_path, swarm_id)
        
        return jsonify(swarm_info), 200
    
    except Exception as e:
        print(traceback.format_exc())
        print(e)
        print('wtf')
        return jsonify({"error": str(e)}), 500