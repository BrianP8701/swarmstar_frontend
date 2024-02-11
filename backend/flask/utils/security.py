import uuid
from datetime import datetime
import bcrypt
import base64

def generate_uuid(identifier):
    if not isinstance(identifier, str):
        raise TypeError("Identifier must be a string")

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f") 
    unique_id = uuid.uuid4()
    return f"{identifier}_{timestamp}_{unique_id}"

def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return base64.b64encode(hashed).decode('utf-8')

def check_password(hashed_password: str, user_password: str) -> bool:
    hashed_password_bytes = base64.b64decode(hashed_password.encode('utf-8'))
    return bcrypt.checkpw(user_password.encode('utf-8'), hashed_password_bytes)
