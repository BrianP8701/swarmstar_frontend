import time

from app.api.chat.ai_message import ai_message

def handle_user_response(node_id: str, message: str):
    time.sleep(1)
    
    fake_ai_response = {
        'role': 'gpt4',
        'content': 'I am a fake AI response'
    }
    
    ai_message(node_id, fake_ai_response)
    
    