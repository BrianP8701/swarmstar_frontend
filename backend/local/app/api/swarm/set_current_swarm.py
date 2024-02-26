from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import update_kv, get_kv
from app.database_schemas.swarms import Swarm
app = FastAPI()
router = APIRouter()

@router.get('/spawn/set_current_swarm')
async def set_current_swarm(swarm_id: str = Query(None, description="The swarm object"), user_id: str = Depends(validate_token)):
    try:        
        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm object is required")

        swarm = get_kv("swarms", swarm_id)
        user_profile = get_kv('user_profiles', user_id)
        user_profile['current_swarm_id'] = swarm_id
        update_kv("user_profiles", user_id, user_profile)
        return {'swarm': swarm, 'user': user_profile}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
