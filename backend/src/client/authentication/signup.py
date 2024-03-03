from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from src.utils.database import create_new_user_profile, create_new_user, get_user
from src.utils.security import create_token
from src.types import UserProfile

class SignupRequest(BaseModel):
    username: str
    password: str
    
class SignupResponse(BaseModel):
    user: UserProfile
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
    
    user = create_new_user(username, password)
    user_profile = create_new_user_profile(user)
    
    user_id = user_profile.id
    token = create_token(user_id)
    
    return {"user_profile": user_profile, "token": token}
