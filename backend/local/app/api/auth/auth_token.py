from fastapi import APIRouter, Depends

from app.utils.security.validate_token import validate_token

router = APIRouter()

@router.get("/auth/auth_token")
async def authenticate_token(username: str = Depends(validate_token)):
    return {"message": "Token is valid", "username": username}
