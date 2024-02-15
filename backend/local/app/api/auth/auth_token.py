from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from app.utils.security.validate_token import validate_token

router = APIRouter()

@router.get("/auth/auth_token")
async def authenticate_token(token_data: dict = Depends(validate_token)):
    return {"message": "Token is valid", "username": token_data["username"]}
