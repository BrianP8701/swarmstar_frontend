from fastapi import Depends, APIRouter, HTTPException
from typing import Dict
from pydantic import BaseModel

from src.utils.security import validate_token
from src.utils.database import update_user, get_user
from src.types import User

router = APIRouter()

class UpdateUserRequest(BaseModel):
    user_updates: Dict

class UpdateUserResponse(BaseModel):
    user: User

@router.put('/user/update_user', response_model=UpdateUserResponse)
async def update_user_values(update_user_request: UpdateUserRequest, user_id: str = Depends(validate_token)):
    try:        
        user_updates = update_user_request.user_updates

        if not user_updates:
            raise HTTPException(status_code=400, detail="User updates are required")

        update_user(user_id, user_updates)
        return {"user": get_user(user_id)}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
