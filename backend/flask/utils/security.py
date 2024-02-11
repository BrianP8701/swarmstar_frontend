import uuid
from datetime import datetime
import bcrypt

def generate_uuid(identifier):
    if not isinstance(identifier, str):
        raise TypeError("Identifier must be a string")

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f") 
    unique_id = uuid.uuid4()
    return f"{identifier}_{timestamp}_{unique_id}"

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(hashed_password: bytes, user_password: str) -> bool:
    return bcrypt.checkpw(user_password.encode('utf-8'), hashed_password)