from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta
import openai

from utils.mongodb import add_kv, get_kv
from utils.security import hash_password, generate_uuid

app = Flask(__name__)
routes = Blueprint('signup_route', __name__)

@routes.route('/auth/signup', methods=['POST'])
@cross_origin()
def signup():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    openai_key = request.json.get('openai_key', None)
    
    try:
        client = openai.OpenAI(api_key=openai_key)
        client.models.list()
    except:
        return jsonify({'error': 'Invalid OpenAI key'}), 401
    
    try:
        get_kv('users', username)
        return jsonify({'error': 'Username already exists'}), 401
    except:
        pass
    
    hashed_password = hash_password(password)
    user_id = generate_uuid(username)
    expires = timedelta(hours=1)  
    token = create_access_token(identity=user_id, expires_delta=expires)
    
    add_kv('users', username, {'user_id': user_id, 
                               'password': hashed_password, 
                               'openai_key': openai_key, 
                               'swarm_ids': [],
                               'swarm_names': {},
                               'current_swarm_id': '',
                               'current_conversation_id': '',
                               })
    
    return jsonify({'token': token}), 200
