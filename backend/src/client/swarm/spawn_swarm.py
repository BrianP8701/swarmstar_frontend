from fastapi import FastAPI, Depends, APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

from server.swarm_operation_queue import spawn_swarm_root
from client.utils.mongodb import get_kv, update_kv
from backend.local.client.utils.validate_token import validate_token

app = FastAPI()
router = APIRouter()

class SpawnSwarmRequest(BaseModel):
    swarm_id: str
    goal: str

class SpawnSwarmResponse(BaseModel):
    swarm: dict


@router.put('/swarm/spawn_swarm', response_model=SpawnSwarmResponse)
async def spawn_swarm(background_tasks: BackgroundTasks, spawn_swarm_request: SpawnSwarmRequest, username: str = Depends(validate_token)):
    try:
        swarm_id = spawn_swarm_request.swarm_id
        goal = spawn_swarm_request.goal
        
        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm ID is required")
        
        if not goal:
            raise HTTPException(status_code=400, detail="Swarm goal is required")

        user = get_kv('user_profiles', username)
        swarm_ids = user['swarm_ids']
        
        if swarm_id not in swarm_ids:
            raise HTTPException(status_code=403, detail="User is not part of the swarm")
        
        updated_swarm_values = {
            'spawned': True,
            'active': True,
            'goal': goal,
        }
        update_kv('swarms', swarm_id, updated_swarm_values)
        
        background_tasks.add_task(spawn_swarm_root, swarm_id, goal)
        return {"swarm": get_kv('swarms', swarm_id)}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

