from flask import Flask
from flask_cors import CORS
from app.auth import routes as auth_routes
from app.spawn import routes as spawn_routes
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv('/Users/brianprzezdziecki/Code/agent_swarm_interface/backend/flask/.env')

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')


jwt = JWTManager(app)

# Simplify the CORS origin to match your frontend access method
CORS(app, origins=['http://lvh.me:3000', 'http://app.lvh.me:3000', 'lvh.me:3000', 'http://auth.localhost:3000', 'http://app.localhost:3000'], supports_credentials=True)

app.register_blueprint(auth_routes)
app.register_blueprint(spawn_routes)
if __name__ == '__main__':
    app.run(debug=True)
