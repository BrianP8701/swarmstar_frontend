from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from flask import Blueprint, jsonify

routes = Blueprint('routes', __name__)

@routes.route('/some-protected-route', methods=['GET'])
@jwt_required()
@cross_origin(origin='http://localhost:3000')
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200