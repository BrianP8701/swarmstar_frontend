from flask import Flask, jsonify, Blueprint
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

app = Flask(__name__)
routes = Blueprint('auth_token_route', __name__)

@routes.route('/auth/auth_token', methods=['GET'])
@jwt_required()
@cross_origin()
def authenticate_token():
    return jsonify({}), 200