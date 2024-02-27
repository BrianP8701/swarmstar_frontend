from fastapi import FastAPI, Depends, APIRouter, HTTPException
from pydantic import BaseModel
import traceback
from app.utils.security.validate_token import validate_token
from app.utils.mongodb import get_kv, delete_kv, update_kv

app = FastAPI()
router = APIRouter()

class SwarmDeleteRequest(BaseModel):
    swarm_id: str

class SwarmDeleteResponse(BaseModel):
    swarm: dict
    user: dict

@router.delete('/swarm/delete_swarm', response_model=SwarmDeleteResponse)
async def delete_swarm(swarm_delete_request: SwarmDeleteRequest, user_id: str = Depends(validate_token)):
    try:
        swarm_id = swarm_delete_request.swarm_id
        
        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm ID is required")

        try:
            user_profile = get_kv('user_profiles', user_id)
        except:
            raise HTTPException(status_code=404, detail="User not found")
        if swarm_id not in user_profile['swarm_ids']:
            raise HTTPException(status_code=403, detail="User is not part of the swarm")
                
        swarm = get_kv('swarms', swarm_id)
        chat_ids = swarm['chat_ids']
        
        for chat_id in chat_ids:
            chat = get_kv('swarm_chats', chat_id)
            for message_id in chat['message_ids']:
                delete_kv('swarm_messages', message_id)
            delete_kv('swarm_chats', chat_id)
            
        for node_id in swarm['node_ids']:
            delete_kv('swarm_nodes', node_id)
            
        for i in range (swarm['frames']):
            delete_kv('swarm_events', f'{swarm_id}_history_{i}')
        
        delete_kv('swarms', swarm_id)
        
        user_profile['swarm_ids'].pop(swarm_id)
        user_profile['current_swarm_id'] = ''
        user_profile['current_chat_id'] = ''
        update_kv('user_profiles', user_id, user_profile)
        
        empty_swarm = {
            'swarm_id': swarm_id,
            'name': '',
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'node_ids': [],
            'frames': 0,
            'owner': ''
        }
        return {'user': user_profile, 'swarm': empty_swarm}
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

