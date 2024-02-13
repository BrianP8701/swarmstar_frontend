from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta
import os
import openai

from utils.database import add_to_kv_store, get_from_kv_store
from utils.security import hash_password, generate_uuid

app = Flask(__name__)
routes = Blueprint('signup_route', __name__)

@routes.route('/auth/signup', methods=['POST'])
@cross_origin()
def signup():
    user_auth_db_path = os.getenv('USER_AUTH_DB_PATH')
    user_info_db_path = os.getenv('USER_INFO_DB_PATH')
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    openai_key = request.json.get('openai_key', None)
    
    try:
        client = openai.OpenAI(api_key=openai_key)
        client.models.list()
    except:
        return jsonify({'error': 'Invalid OpenAI key'}), 401
    
    try:
        get_from_kv_store(user_auth_db_path, username)
        return jsonify({'error': 'Username already exists'}), 401
    except:
        pass
    
    hashed_password = hash_password(password)
    user_id = generate_uuid(username)
    expires = timedelta(hours=1)  
    token = create_access_token(identity=user_id, expires_delta=expires)
    
    add_to_kv_store(user_info_db_path, user_id, {'swarm_ids': [],'swarm_names': {}})
    add_to_kv_store(user_auth_db_path, username, {'user_id': user_id, 'password': hashed_password, 'openai_key': openai_key})
    
    return jsonify({'user_swarms': {'swarm_ids': [],'swarm_names': {}}, 'token': token}), 200