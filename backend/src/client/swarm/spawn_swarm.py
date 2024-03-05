from fastapi import Depends, APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

from src.server.spawn_swarm import spawn_swarm as server_spawn_swarm
from src.utils.security import validate_token
from src.utils.database import update_user_swarm_on_spawn, get_user_swarm
from src.types import UserSwarm

router = APIRouter()


class SpawnSwarmRequest(BaseModel):
    swarm_id: str
    goal: str


class SpawnSwarmResponse(BaseModel):
    swarm: UserSwarm


@router.put("/swarm/spawn_swarm", response_model=SpawnSwarmResponse)
async def spawn_swarm(
    background_tasks: BackgroundTasks,
    spawn_swarm_request: SpawnSwarmRequest,
    user_id: str = Depends(validate_token),
):
    try:
        swarm_id = spawn_swarm_request.swarm_id
        goal = spawn_swarm_request.goal

        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm ID is required")
        if not goal:
            raise HTTPException(status_code=400, detail="Swarm goal is required")

        update_user_swarm_on_spawn(swarm_id, goal)

        background_tasks.add_task(server_spawn_swarm, swarm_id, goal)

        return {"swarm": get_user_swarm(swarm_id)}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
