from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import check_password_hash
from flask_cors import cross_origin
from datetime import timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity, set_access_cookies, verify_jwt_in_request

app = Flask(__name__)
routes = Blueprint('auth_routes', __name__)

@routes.route('/login', methods=['POST'])
@cross_origin()
def login():
    username = request.json.get('username', None)
    # Create JWT token
    expires = timedelta(hours=24)  # Token valid for 24 hours
    token = create_access_token(identity=username, expires_delta=expires)

    # User data to be returned
    user_data = {
        'currentSwarm': 'exampleSwarm',
        'username': username,
        'userSwarms': ['swarm1', 'swarm2'],
        'currentSection': 'exampleSection',
        'currentGoal': 'exampleGoal',
        'isRunning': False,
    }
    
    response = jsonify({"user": user_data, "token": token})
    return response


@routes.route('/auth', methods=['GET'])
@jwt_required()
@cross_origin()
def authenticate_token():
    print('\n\n\n\nyo what up\n\n\n\n')

    print("Request Headers:")
    for header, value in request.headers.items():
        print(f"{header}: {value}")

    print('\n\n\n\n')
    # current_user = get_jwt_identity()
    return jsonify({}), 200









# @routes.route('/login', methods=['POST'])
# @cross_origin(origin='http://localhost:3000')
# def login():
#     username = request.json.get('username', None)
#     password = request.json.get('password', None)

#     # Validate credentials (usually check against database)
#     # For this example, let's use a dummy check
#     if username != 'admin' or not check_password_hash('hashed-password', password):
#         return jsonify({"msg": "Bad username or password"}), 401

#     # Create JWT token
#     expires = timedelta(hours=24)  # 24 hours
#     token = create_access_token(identity=username, expires_delta=expires)

#     # User data to be returned
#     user_data = {
#         'currentSwarm': 'exampleSwarm',
#         'username': username,  # Use the actual username from the request
#         'userSwarms': ['swarm1', 'swarm2'],
#         'currentSection': 'exampleSection',
#         'currentGoal': 'exampleGoal',
#     }

#     # Add user_data to the response
#     response = jsonify({"token": token, "user": user_data})
#     response.set_cookie('token', token, httponly=True)
    
#     return response



