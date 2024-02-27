from fastapi import FastAPI, Depends, APIRouter, HTTPException
from pydantic import BaseModel

from app.utils.mongodb import get_kv, add_kv, update_kv
from app.utils.security.uuid import generate_uuid
from app.utils.security.validate_token import validate_token

app = FastAPI()
router = APIRouter()

class CreateSwarmRequest(BaseModel):
    swarm_name: str

class CreateSwarmResponse(BaseModel):
    swarm: dict
    user: dict

@router.post('/swarm/create_swarm', response_model=CreateSwarmResponse)
async def create_swarm(create_swarm_request: CreateSwarmRequest, user_id: str = Depends(validate_token)):
    try:
        new_swarm_name = create_swarm_request.swarm_name
        
        if not new_swarm_name:
            raise HTTPException(status_code=400, detail="Swarm name is required")
        
        try:
            user_profile = get_kv('user_profiles', user_id)
        except:
            raise HTTPException(status_code=404, detail="User not found")
        if not user_profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        if new_swarm_name in user_profile['swarm_ids'].values():
            raise HTTPException(status_code=400, detail="Swarm name already exists")
        
        clean_swarm_name = "".join(e for e in new_swarm_name if e.isalnum())
        swarm_id = generate_uuid(clean_swarm_name)
        
        updated_user_values = {
            'swarm_ids': user_profile['swarm_ids'], 
            'current_swarm_id': swarm_id, 
            'current_chat_id': ''
        }
        update_kv('user_profiles', user_id, updated_user_values)
         
        username = user_profile['username']
        new_swarm = {
            'swarm_id': swarm_id,
            'name': new_swarm_name,
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'root_node_id': '',
            'node_ids': [],
            'frames': 0,
            'owner': username
        }
        
        add_kv('swarms', swarm_id, new_swarm)
        return {'swarm': new_swarm, 'user': get_kv('user_profiles', user_id)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
