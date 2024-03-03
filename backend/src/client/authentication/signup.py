from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta
import jwt
from pydantic import BaseModel
import os

from client.utils.mongodb import add_kv, get_kv
from backend.local.client.utils.passwords import hash_password
from backend.local.server.utils.uuid import generate_uuid

SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

class SignupRequest(BaseModel):
    username: str
    password: str
    
class SignupResponse(BaseModel):
    user: dict
    token: str

router = APIRouter()

@router.put("/auth/signup", response_model=SignupResponse)
async def signup(signup_data: SignupRequest):
    username = signup_data.username
    password = signup_data.password
    
    try:
        get_kv('users', username)
        raise HTTPException(status_code=401, detail="Username already exists")
    except ValueError:
        pass
    
    hashed_password = hash_password(password)
    clean_username = "".join(e for e in username if e.isalnum())
    user_id = generate_uuid(clean_username)
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    token_data = {"user_id": user_id, "exp": expire.timestamp()}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    user = {'user_id': user_id, 
            'hashed_password': hashed_password,
    }
    user_profile = {
        'username': username,
        'swarm_ids': {},
        'current_swarm_id': '',
        'current_chat_id': '',
    }
    add_kv('users', username, user)
    add_kv('user_profiles', user_id, user_profile)
    return {"user": user_profile, "token": token}
