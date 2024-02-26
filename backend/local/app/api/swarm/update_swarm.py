from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import update_kv
from app.database_schemas.swarms import Swarm
app = FastAPI()
router = APIRouter()

@router.put('/spawn/update_swarm')
async def update_swarm(swarm: Swarm = Query(None, description="The swarm object"), user_id: str = Depends(validate_token)):
    try:        
        if not swarm:
            raise HTTPException(status_code=400, detail="Swarm object is required")

        swarm_id = swarm["swarm_id"]
        update_kv("swarms", swarm_id, swarm)
        return {}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
