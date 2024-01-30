from flask import request, jsonify

def init_routes(app):
    @app.route('/post', methods=['POST'])
    def receive_data():
        print('are we even here?')
        data = request.json  # Data received as a dictionary
        print(data)  # Process the data as needed
        return jsonify({"message": "Data received"}), 200

    @app.route('/get', methods=['GET'])
    def send_data():
        data_to_send = {"key": "value"}  # Data you want to send
        return jsonify(data_to_send), 200

    def post_router(data):
        print(data['body']) 
        
    def get_router():
        print('get_router called')