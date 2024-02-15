from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta
import jwt
from app.utils.mongodb import get_kv, clean
from app.utils.security import check_password
from app.utils.type_operations import backend_user_to_frontend_user
import os

class LoginSchema(BaseModel):
    username: str
    password: str

SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter()

@router.post("/auth/login")
async def login(login_data: LoginSchema):
    username = login_data.username
    password = login_data.password
    user_record = get_kv('users', username)
    if not user_record or not check_password(user_record['password'], password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    token_data = {"sub": username, "exp": expire}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    clean(user_record)
    return {"user": backend_user_to_frontend_user(user_record), "token": token}

