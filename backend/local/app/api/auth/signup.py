from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta
import jwt
import openai
from pydantic import BaseModel
import os

from app.utils.mongodb import add_kv, get_kv
from backend.local.app.utils.security.security import hash_password, generate_uuid
from app.utils.type_operations import backend_user_to_frontend_user
from app.utils.type_operations import clean

SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

class SignupSchema(BaseModel):
    username: str
    password: str
    openai_key: str

router = APIRouter()

@router.put("/auth/signup")
async def signup(signup_data: SignupSchema):
    username = signup_data.username
    password = signup_data.password
    openai_key = signup_data.openai_key
    
    try:
        get_kv('users', username)
        raise HTTPException(status_code=401, detail="Username already exists")
    except:
        pass
    
    try:
        client = openai.OpenAI(api_key=openai_key)
        client.models.list()
    except:
        raise HTTPException(status_code=401, detail="Invalid OpenAI key")
    
    hashed_password = hash_password(password)
    user_id = generate_uuid(username)
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    token_data = {"sub": username, "exp": expire}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    user = {'user_id': user_id, 
            'password': hashed_password, 
            'openai_key': openai_key, 
            'swarm_ids': [],
            'swarm_names': {},
            'current_swarm_id': '',
            'current_chat_id': '',
            }
    add_kv('users', username, user)
    
    return {"user": clean(backend_user_to_frontend_user(user)), "token": token}
