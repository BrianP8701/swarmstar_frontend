from fastapi import FastAPI, Depends, APIRouter, HTTPException
from pydantic import BaseModel

from app.utils.mongodb import get_kv, add_kv, update_kv
from app.utils.security.uuid import generate_uuid
from app.utils.security.validate_token import validate_token

app = FastAPI()
router = APIRouter()

class SwarmCreateRequest(BaseModel):
    swarm_name: str

class SwarmCreateResponse(BaseModel):
    swarm: dict
    user: dict

@router.post('/spawn/create_swarm', response_model=SwarmCreateResponse)
async def create_swarm(swarm_create_request: SwarmCreateRequest, user_id: str = Depends(validate_token)):
    try:
        new_swarm_name = swarm_create_request.swarm_name
        
        if not new_swarm_name:
            raise HTTPException(status_code=400, detail="Swarm name is required")
        
        user_profile = get_kv('user_profiles', user_id)
        
        if not user_profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        clean_swarm_name = "".join(e for e in new_swarm_name if e.isalnum())
        swarm_id = generate_uuid(clean_swarm_name)
        
        user_profile['swarm_ids'][swarm_id] = new_swarm_name
        user_profile['current_swarm_id'] = swarm_id
        user_profile['current_chat_id'] = ''
        username = get_kv('users', user_id)['username']
        update_kv('users', user_id, user_profile)
         
        new_swarm = {
            'swarm_id': swarm_id,
            'name': new_swarm_name,
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'node_ids': [],
            'frames': 0,
            'owner': username
        }
        
        add_kv('swarms', swarm_id, new_swarm)
        return {'swarm': new_swarm, 'user': user_profile}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
