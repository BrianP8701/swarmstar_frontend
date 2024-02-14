from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
import traceback

from utils.mongodb import get_kv, update_kv, clean

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
        
        print(swarm)
        
        # TODO Actually spawn the swarm
        
        '''
            we can simulate something here.
            call something in swarm folder.
            have a random timer. 
            then create a new conversation with an initial message.
            then update the swarm and conversations in the frontend
            then we need to handle the user reply in the frontend and backend
            and we can simulate another message and termination of the conversation
        '''
        
        update_kv('swarms', swarm_id, swarm)
        
        clean(swarm)
        return jsonify(swarm), 200
    
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500