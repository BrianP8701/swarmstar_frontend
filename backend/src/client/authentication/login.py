from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
import jwt
import os

from client.utils.mongodb import get_kv
from backend.local.client.utils.passwords import check_password

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    user: dict
    token: str

SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter()

@router.post("/auth/login", response_model=LoginResponse)
async def login(login_request: LoginRequest):
    username = login_request.username
    password = login_request.password
    user = get_kv('users', username)
    if not user or not check_password(user['hashed_password'], password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    user_id = user['user_id']
    token_data = {"user_id": user_id, "exp": expire.timestamp()}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    user_profile = get_kv('user_profiles', user_id)
    return {"user": user_profile, "token": token}
