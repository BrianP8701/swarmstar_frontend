from flask import Flask
from flask_cors import CORS
from app.auth import routes as auth_routes
from flask_jwt_extended import JWTManager
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'googagaga'  # Use a strong, secret key for JWT
# app.config['JWT_TOKEN_LOCATION'] = ['cookies']
# app.config['JWT_COOKIE_SECURE'] = False  # Consider setting to True if using HTTPS
# app.config['JWT_COOKIE_CSRF_PROTECT'] = False
# app.config['JWT_SAME_SITE'] = "Lax"
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
# app.config['JWT_COOKIE_DOMAIN'] = ".lvh.me"
# app.config['JWT_COOKIE_PATH'] = "/"


jwt = JWTManager(app)

# Simplify the CORS origin to match your frontend access method
CORS(app, origins=['http://lvh.me:3000', 'http://app.lvh.me:3000', 'lvh.me:3000', 'http://auth.localhost:3000', 'http://app.localhost:3000'], supports_credentials=True)

app.register_blueprint(auth_routes)

if __name__ == '__main__':
    app.run(debug=True)
