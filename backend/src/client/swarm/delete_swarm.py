from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel
import traceback

from src.utils.security import validate_token
from src.utils.database import get_user, delete_user_swarm
from src.types.user import User

router = APIRouter()


class SwarmDeleteRequest(BaseModel):
    swarm_id: str


class SwarmDeleteResponse(BaseModel):
    swarm: None
    user: User


@router.delete("/swarm/delete_swarm/{swarm_id}", response_model=SwarmDeleteResponse)
async def delete_swarm(
    swarm_id: str, user_id: str = Depends(validate_token)
):
    try:
        print(swarm_id, user_id)
        user = get_user(user_id)
        
        if swarm_id not in user.swarm_ids:
            raise HTTPException(status_code=403, detail="User is not part of the swarm")

        delete_user_swarm(swarm_id)

        return {"user": get_user(user_id), "swarm": None}
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
