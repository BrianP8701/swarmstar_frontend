from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel

from src.utils.security import validate_token
from src.utils.database import copy_swarm, get_user, update_user, get_user_swarm
from src.types import UserSwarm, User

router = APIRouter()


class CopySwarmRequest(BaseModel):
    swarm_name: str
    old_swarm_id: str


class CopySwarmResponse(BaseModel):
    swarm: UserSwarm
    user: User


@router.post("/swarm/copy_swarm", response_model=CopySwarmResponse)
async def create_swarm(
    create_swarm_request: CopySwarmRequest, user_id: str = Depends(validate_token)
):
    try:
        new_swarm_name = create_swarm_request.swarm_name
        old_swarm_id = create_swarm_request.old_swarm_id
        user = get_user(user_id)

        if not new_swarm_name:
            raise HTTPException(status_code=400, detail="Swarm name is required")
        if new_swarm_name in user.swarm_ids.values():
            raise HTTPException(status_code=400, detail="Swarm name already exists")

        user_swarm = copy_swarm(user_id, new_swarm_name, old_swarm_id)
        
        return {"swarm": user_swarm, "user": get_user(user_id)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
