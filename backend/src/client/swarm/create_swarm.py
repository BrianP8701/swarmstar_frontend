from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel

from src.utils.security import validate_token
from src.utils.database import create_empty_user_swarm, get_user
from src.types import UserSwarm, User

router = APIRouter()

class CreateSwarmRequest(BaseModel):
    swarm_name: str

class CreateSwarmResponse(BaseModel):
    swarm: UserSwarm
    user: User

@router.post('/swarm/create_swarm', response_model=CreateSwarmResponse)
async def create_swarm(create_swarm_request: CreateSwarmRequest, user_id: str = Depends(validate_token)):
    try:
        new_swarm_name = create_swarm_request.swarm_name
        user = get_user(user_id)
        
        if not new_swarm_name:
            raise HTTPException(status_code=400, detail="Swarm name is required")
        if new_swarm_name in user['swarm_ids'].values():
            raise HTTPException(status_code=400, detail="Swarm name already exists")

        user_swarm = create_empty_user_swarm(user_id, new_swarm_name)

        return {'swarm': user_swarm, 'user': get_user(user_id)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
