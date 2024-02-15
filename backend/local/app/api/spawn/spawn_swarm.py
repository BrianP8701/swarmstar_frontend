from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import traceback
import requests

from app.utils.mongodb import get_kv, update_kv, clean
from app.swarm.simulate_swarm_spawn import simulate_swarm_spawn

app = Flask(__name__)
spawn_swarm_route = Blueprint('spawn_swarm', __name__)

@spawn_swarm_route.route('/spawn/spawn_swarm', methods=['PUT'])
@jwt_required()
@cross_origin()
def spawn_swarm():
    try:
        username = get_jwt_identity()
        swarm_id = request.json.get('swarm_id', None)
        goal = request.json.get('goal', None)
        
        if not swarm_id:
            return jsonify({"error": "Swarm ID is required"}), 400
        
        if not goal:
            return jsonify({"error": "Swarm goal is required"}), 400

        user = get_kv('users', username)
        swarm_ids = user['swarm_ids']
        
        if swarm_id not in swarm_ids:
            return jsonify({"error": "User is not part of the swarm"}), 403
        
        swarm = get_kv('swarms', swarm_id)
        swarm['spawned'] = True
        swarm['goal'] = goal
        swarm['active'] = True
        
        url = 'http://localhost:5000/spawn/swarm'
        payload = {
            'swarm_id': swarm_id,
            'goal': goal
        }
        headers = {
            'Content-Type': 'application/json'
        }
        response = requests.post(url, json=payload, headers=headers)

        simulate_swarm_spawn(swarm_id)
 
        
        update_kv('swarms', swarm_id, swarm)
        
        clean(swarm)
        return jsonify(swarm), 200
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500