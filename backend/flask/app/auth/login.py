from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from datetime import timedelta

from utils.mongodb import get_kv
from utils.security import check_password
from utils.type_operations import backend_user_to_frontend_user

app = Flask(__name__)
routes = Blueprint('login_route', __name__)

@routes.route('/auth/login', methods=['POST'])
@cross_origin()
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    correct_password = get_kv('users', username)['password']
    if not check_password(correct_password, password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    user = get_kv('users', username)
    expires = timedelta(hours=1)  # Token valid for 24 hours
    token = create_access_token(identity=user['user_id'], expires_delta=expires)

    response = jsonify({'user': backend_user_to_frontend_user(user), 'token': token})
    return response
