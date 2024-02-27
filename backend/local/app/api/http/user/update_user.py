from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query
from typing import Dict
from pydantic import BaseModel

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import update_kv, get_kv
app = FastAPI()
router = APIRouter()

class UpdateUserRequest(BaseModel):
    user_updates: Dict

@router.put('/user/update_user')
async def update_user(update_user_request: UpdateUserRequest, user_id: str = Depends(validate_token)):
    try:        
        user_updates = update_user_request.user_updates

        if not user_updates or not user_id:
            raise HTTPException(status_code=400, detail="User updates and user_id are required")

        try:
            existing_user = get_kv("user_profiles", user_id)
        except:
            raise HTTPException(status_code=404, detail="User not found")

        # Update the existing user with the new values
        for key, value in user_updates.items():
            if key not in existing_user:
                raise HTTPException(status_code=400, detail=f"Key '{key}' is not a valid user attribute")
            existing_user[key] = value

        update_kv("users", user_id, existing_user)
        return {"user": existing_user}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
