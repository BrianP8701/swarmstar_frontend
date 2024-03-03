from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.utils.database import create_new_user_profile, create_new_user, get_user
from src.utils.security import create_token
from src.types import User


class SignupRequest(BaseModel):
    username: str
    password: str


class SignupResponse(BaseModel):
    user: User
    token: str


router = APIRouter()


@router.put("/auth/signup", response_model=SignupResponse)
async def signup(signup_data: SignupRequest):
    username = signup_data.username
    password = signup_data.password

    try:
        get_user(username)
        raise HTTPException(status_code=401, detail="Username already exists")
    except ValueError:
        pass
    
    user_profile = create_new_user_profile(username, password)
    user = create_new_user(user_profile)
    token = create_token(user.id)

    return {"user": user, "token": token}
