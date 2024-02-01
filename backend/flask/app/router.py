# In app/routes.py
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

routes = Blueprint('routes', __name__)

@routes.route('/post_router', methods=['POST'])
@cross_origin(origin='http://localhost:3000')
def receive_data():
    data = request.json  # Data received as a dictionary
    print(data)
    print(type(data))
    return jsonify({"message": "Data received"}), 200

@routes.route('/get_router', methods=['GET'])
@cross_origin(origin='http://localhost:3000')
def send_data():
    data_to_send = {"key": "value"}  # Data you want to send
    return jsonify(data_to_send), 200

def post_router(data):
    print(data['body'])
    
def get_router():
    print('get_router called')


    
