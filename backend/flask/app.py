from flask import Flask
from flask_cors import CORS
from app.auth.auth_token import routes as auth_route
from app.auth.login import routes as login_route
from app.auth.signup import routes as signup_route
from app.auth.auth_token import routes as auth_token_route

from app.spawn.delete_swarm import routes as delete_swarm_route
from app.spawn.get_swarm import routes as get_swarm_route
from app.spawn.spawn_swarm import routes as spawn_swarm_route
from app.spawn.create_swarm import routes as create_swarm_route

from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

load_dotenv('/Users/brianprzezdziecki/Code/agent_swarm_interface/backend/flask/.env')

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')


jwt = JWTManager(app)

# Simplify the CORS origin to match your frontend access method
CORS(app, origins=['http://lvh.me:3000', 'http://app.lvh.me:3000', 'lvh.me:3000', 'http://auth.localhost:3000', 'http://app.localhost:3000'], supports_credentials=True)

app.register_blueprint(login_route)
app.register_blueprint(signup_route)
app.register_blueprint(auth_token_route)
app.register_blueprint(delete_swarm_route)
app.register_blueprint(get_swarm_route)
app.register_blueprint(spawn_swarm_route)
app.register_blueprint(create_swarm_route)

if __name__ == '__main__':
    app.run(debug=True)
