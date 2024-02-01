from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from flask import Blueprint, jsonify

routes = Blueprint('routes', __name__)

@routes.route('/is-authenticated', methods=['GET'])
@jwt_required()
@cross_origin(origin='http://localhost:3000')
def protected():
    return 200

