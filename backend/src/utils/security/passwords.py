import bcrypt
import base64

def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return base64.b64encode(hashed).decode('utf-8')

def check_password(hashed_password: str, user_password: str) -> bool:
    hashed_password_bytes = base64.b64decode(hashed_password.encode('utf-8'))
    return bcrypt.checkpw(user_password.encode('utf-8'), hashed_password_bytes)
