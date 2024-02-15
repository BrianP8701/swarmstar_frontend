from fastapi import FastAPI, Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from app.utils.mongodb import get_kv, add_kv, update_kv, clean
from app.utils.security.uuid import generate_uuid
from app.utils.security.validate_token import validate_token

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

# Define your Pydantic models (schemas) for request and response data
class SwarmCreateRequest(BaseModel):
    swarm_name: str

class SwarmCreateResponse(BaseModel):
    swarm: dict
    user: dict

@router.post('/spawn/create_swarm', response_model=SwarmCreateResponse)
async def create_swarm(swarm_create_request: SwarmCreateRequest, username: str = Depends(validate_token)):
    try:
        new_swarm_name = swarm_create_request.swarm_name
        
        if not new_swarm_name:
            raise HTTPException(status_code=400, detail="Swarm name is required")
        
        user = get_kv('users', username)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        swarm_id = generate_uuid(new_swarm_name)
        
        user['swarm_ids'].append(swarm_id)
        user['swarm_names'][swarm_id] = new_swarm_name
        user['current_swarm_id'] = swarm_id
        update_kv('users', username, user)
         
        new_swarm = {
            'name': new_swarm_name,
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': [],
            'chat_names': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'nodes': [],
            'root_node_id': None,
            'frames': 0
        }
        
        add_kv('swarms', swarm_id, new_swarm)
        clean(new_swarm)
        clean(user)
        user['username'] = username
        return {'swarm': new_swarm, 'user': user}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
