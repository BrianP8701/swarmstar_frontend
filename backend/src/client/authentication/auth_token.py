from fastapi import APIRouter, Depends

from backend.local.client.utils.validate_token import validate_token

router = APIRouter()

@router.get("/auth/auth_token")
async def authenticate_token(user_id: str = Depends(validate_token)):
    return {}
