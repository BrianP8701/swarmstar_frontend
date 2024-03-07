from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from src.utils.security import validate_token
from src.utils.database import get_user_swarm, get_user, get_current_swarm_state_representation
from src.utils.database import set_current_swarm as server_set_current_swarm
from src.types import UserSwarm, User

router = APIRouter()


class SetCurrentSwarmRequest(BaseModel):
    swarm_id: Optional[str] = None


class SetCurrentSwarmResponse(BaseModel):
    swarm: Optional[UserSwarm] = None
    user: User
    swarm_tree: Optional[dict] = None


@router.put("/swarm/set_current_swarm", response_model=SetCurrentSwarmResponse)
async def set_current_swarm(
    set_current_swarm_request: SetCurrentSwarmRequest,
    user_id: str = Depends(validate_token),
):
    try:
        swarm_id = set_current_swarm_request.swarm_id
        swarm_tree = server_set_current_swarm(user_id, swarm_id)

        print(f"\n\n\nswarm_tree: {swarm_tree}\n\n\n")
        
        if not swarm_id:
            return {"swarm": None, "user": get_user(user_id)}

        return {
            "swarm": get_user_swarm(swarm_id), 
            "user": get_user(user_id), 
            "swarm_tree": swarm_tree
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
