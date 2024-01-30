from flask import Flask
from flask_cors import CORS
from app.routes import init_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    print(app.url_map)
    init_routes(app)
    return app

if __name__ == '__main__':
    create_app().run(debug=True)  # Run the app in debug mode

