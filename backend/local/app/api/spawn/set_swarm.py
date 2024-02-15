from fastapi import FastAPI, Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import get_kv, delete_kv, update_kv, clean
from app.utils.type_operations import backend_user_to_frontend_user

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

# Define your Pydantic models (schemas) for request and response data
class SwarmSetRequest(BaseModel):
    swarm_id: str

class SwarmSetResponse(BaseModel):
    swarm: dict
    user: dict


@router.post('/spawn/set_swarm', response_model=SwarmSetResponse)
async def set_swarm(swarm_set_request: SwarmSetRequest, username: str = Depends(validate_token)):
    try:        
        swarm_id = swarm_set_request.swarm_id

        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm ID is required")

        user = get_kv('users', username)
        swarm_ids = user['swarm_ids']
        
        if swarm_id == '':
            swarm = {
                "name": "",
                "goal": "",
                "spawned": False,
                "active": False,
                "chat_ids": [],
                "chat_names": {},
                "live_chat_ids": [],
                "terminated_chat_ids": [],
                "nodes": [],
                "root_node_id": None,
                "frames": 0
            }
        else:
            if swarm_id not in swarm_ids:
                raise HTTPException(status_code=403, detail="User is not part of the swarm")
            swarm = get_kv('swarms', swarm_id)
            
        user['current_swarm_id'] = swarm_id
        update_kv('users', username, user)
        clean(swarm)
        clean(user)
        user = backend_user_to_frontend_user(user)
        user['username'] = username
        return {'swarm': swarm, 'user': user}, 200
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

