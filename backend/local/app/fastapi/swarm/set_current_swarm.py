from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query
from pydantic import BaseModel

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import update_kv, get_kv
from app.database_schemas.swarms import Swarm
app = FastAPI()
router = APIRouter()

class SetCurrentSwarmRequest(BaseModel):
    swarm_id: str

@router.put('/spawn/set_current_swarm')
async def set_current_swarm(set_current_swarm_request: SetCurrentSwarmRequest, user_id: str = Depends(validate_token)):
    try:        
        swarm_id = set_current_swarm_request.swarm_id
        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm ID is required")

        swarm = get_kv("swarms", swarm_id)
        user_profile = get_kv('user_profiles', user_id)
        user_profile['current_swarm_id'] = swarm_id
        update_kv("user_profiles", user_id, user_profile)
        return {'swarm': swarm, 'user': user_profile}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
