from flask import Flask
from flask_sse import sse

app = Flask(__name__)
sse = sse.App(app)

def create_conversation(data):
    """Function to trigger server-sent event from any Python function"""
    sse.publish({'message': data}, type='data')
