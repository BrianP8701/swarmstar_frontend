# In your main app file
from flask import Flask
from flask_cors import CORS
from backend.flask.app.router import routes
from backend.flask.app.login import routes as login_routes

app = Flask(__name__)
CORS(app)
app.register_blueprint(routes)
app.register_blueprint(login_routes)

if __name__ == '__main__':
    app.run(debug=True)
