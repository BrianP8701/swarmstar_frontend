from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta
import jwt
import os

from app.utils.mongodb import get_kv, clean
from app.utils.security.passwords import check_password
from app.utils.type_operations import backend_user_to_frontend_user

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
    user_record = get_kv('users', username)
    if not user_record or not check_password(user_record['password'], password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    token_data = {"sub": username, "exp": expire.timestamp()}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    user_record['username'] = username
    cleaned_user = clean(backend_user_to_frontend_user(user_record))
    return {"user": cleaned_user, "token": token}
