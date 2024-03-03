from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from src.utils.security import validate_token
from src.utils.database import get_user_swarm, set_current_swarm_id, get_user
from src.types import UserSwarm, User

router = APIRouter()

class SetCurrentSwarmRequest(BaseModel):
    swarm_id: Optional[str] = None

class SetCurrentSwarmResponse(BaseModel):
    swarm: Optional[UserSwarm] = None
    user: User

@router.put('/swarm/set_current_swarm', response_model=SetCurrentSwarmResponse)
async def set_current_swarm(set_current_swarm_request: SetCurrentSwarmRequest, user_id: str = Depends(validate_token)):
    try:        
        swarm_id = set_current_swarm_request.swarm_id
        set_current_swarm_id(user_id, swarm_id)
        
        if not swarm_id:
            return {'swarm': None, 'user': get_user(user_id)}

        return {'swarm': get_user_swarm(user_id), 'user': get_user(user_id)}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
