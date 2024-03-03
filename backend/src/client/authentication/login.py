from pydantic import BaseModel
from fastapi import APIRouter, HTTPException

from src.utils.database import get_user, get_user_profile
from src.utils.security import check_password, create_token
from src.types import UserProfile


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    user: UserProfile
    token: str


router = APIRouter()


@router.post("/auth/login", response_model=LoginResponse)
async def login(login_request: LoginRequest):
    username = login_request.username
    password = login_request.password

    user = get_user_profile(username)
    if not user or not check_password(user["password"], password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    user_id = user["user_id"]
    token = create_token(user_id)

    return {"user": get_user(user_id), "token": token}
