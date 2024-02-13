from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import os
import traceback

from utils.mongodb import add_kv, get_kv, update_kv

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

        user = get_kv('users', user_id)
        swarm_ids = user['swarm_ids']
        
        if swarm_id not in swarm_ids:
            return jsonify({"error": "User is not part of the swarm"}), 403
        
        swarm = get_kv('swarms', swarm_id)
        swarm['spawned'] = True
        swarm['goal'] = goal
        swarm['active'] = True
        
        # TODO Actually spawn the swarm
        
        update_kv('swarms', swarm_id, swarm)
        
        return jsonify(swarm), 200
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500