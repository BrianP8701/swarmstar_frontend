from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import check_password_hash
from flask_cors import cross_origin
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this!
jwt = JWTManager(app)
routes = Blueprint('routes', __name__)

@routes.route('/login', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Validate credentials (usually check against database)
    # For this example, let's use a dummy check
    if username != 'admin' or not check_password_hash('hashed-password', password):
        return jsonify({"msg": "Bad username or password"}), 401

    # Create JWT token
    expires = timedelta(hours=24)  # 24 hours
    token = create_access_token(identity=username, expires_delta=expires)
    response = jsonify({"token": token})
    response.set_cookie('token', token, httponly=True)
    return response

