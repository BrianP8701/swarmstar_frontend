from flask import Flask
from flask_socketio import SocketIO
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os
from flask_cors import CORS

socketio = SocketIO()
load_dotenv('/Users/brianprzezdziecki/Code/agent_swarm_interface/backend/flask/.env')

def create_app():
    app = Flask(__name__)
    
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    jwt = JWTManager(app)
    
    CORS(app, supports_credentials=True)
    socketio.init_app(app, cors_allowed_origins="*")
    
    from .api import configure_routes
    configure_routes(app)

    return app