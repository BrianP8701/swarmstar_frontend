from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query
from pydantic import BaseModel

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import update_kv, get_kv
from app.database_schemas.swarms import Swarm
app = FastAPI()
router = APIRouter()

class SetCurrentSwarmRequest(BaseModel):
    swarm_id: str

@router.put('/swarm/set_current_swarm')
async def set_current_swarm(set_current_swarm_request: SetCurrentSwarmRequest, user_id: str = Depends(validate_token)):
    try:        
        swarm_id = set_current_swarm_request.swarm_id
        user_profile = get_kv('user_profiles', user_id)
        if not swarm_id:
            swarm_id = ''
            empty_swarm = {
                'swarm_id': '',
                'name': '',
                'goal': '',
                'spawned': False,
                'active': False,
                'chat_ids': {},
                'live_chat_ids': [],
                'terminated_chat_ids': [],
                'root_node_id': '',
                'node_ids': [],
                'frames': 0,
                'owner': ''
            }
            user_profile['current_swarm_id'] = swarm_id
            return {'swarm': empty_swarm, 'user': user_profile}

        swarm = get_kv("swarms", swarm_id)
        user_profile['current_swarm_id'] = swarm_id
        update_kv("user_profiles", user_id, user_profile)
        return {'swarm': swarm, 'user': user_profile}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
