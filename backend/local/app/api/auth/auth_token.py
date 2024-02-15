from flask import Flask, jsonify, Blueprint
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

app = Flask(__name__)
auth_token_route = Blueprint('auth_token', __name__)

@auth_token_route.route('/auth/auth_token', methods=['GET'])
@jwt_required()
@cross_origin()
def authenticate_token():
    return jsonify({}), 200