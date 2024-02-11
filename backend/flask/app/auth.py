from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import create_access_token
import bcrypt
from flask_cors import cross_origin
from datetime import timedelta
from flask_jwt_extended import jwt_required
from dotenv import load_dotenv
import os
import openai

from utils.database import add_to_kv_store, get_from_kv_store, delete_from_kv_store
from utils.security import hash_password, check_password, generate_uuid
load_dotenv()

app = Flask(__name__)
routes = Blueprint('auth_routes', __name__)

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
    
    add_to_kv_store(user_info_db_path, {'swarm_ids': [],'swarm_names': {}})
    add_to_kv_store(user_auth_db_path, {'user_id': user_id, 'password': hashed_password, 'openai_key': openai_key})
    
    return jsonify({'user_swarms': {'swarm_ids': [],'swarm_names': {}}, 'token': token}), 200

@routes.route('/auth/login', methods=['POST'])
@cross_origin()
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    correct_password = get_from_kv_store(os.getenv('USER_AUTH_DB_PATH'), username)['password']
    if not check_password(password, correct_password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    user_id = get_from_kv_store(os.getenv('USER_AUTH_DB_PATH'), username)['user_id']
    expires = timedelta(hours=1)  # Token valid for 24 hours
    token = create_access_token(identity=user_id, expires_delta=expires)

    user_swarms = get_from_kv_store(os.getenv('USER_INFO_DB_PATH'), user_id)
    
    response = jsonify({"user_swarms": user_swarms, "token": token})
    return response

@routes.route('/auth', methods=['GET'])
@jwt_required()
@cross_origin()
def authenticate_token():
    return jsonify({}), 200
