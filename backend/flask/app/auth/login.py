from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta
import os

from utils.database import get_from_kv_store
from utils.security import check_password
app = Flask(__name__)
routes = Blueprint('login_route', __name__)

@routes.route('/auth/login', methods=['POST'])
@cross_origin()
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    correct_password = get_from_kv_store(os.getenv('USER_AUTH_DB_PATH'), username)['password']
    if not check_password(correct_password, password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    user_id = get_from_kv_store(os.getenv('USER_AUTH_DB_PATH'), username)['user_id']
    expires = timedelta(hours=1)  # Token valid for 24 hours
    token = create_access_token(identity=user_id, expires_delta=expires)

    user_swarms = get_from_kv_store(os.getenv('USER_INFO_DB_PATH'), user_id)
    response = jsonify({"user_swarms": user_swarms, "token": token})
    return response
