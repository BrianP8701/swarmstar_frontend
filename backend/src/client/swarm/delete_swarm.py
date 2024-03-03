from fastapi import FastAPI, Depends, APIRouter, HTTPException
from pydantic import BaseModel
import traceback
from backend.local.client.utils.validate_token import validate_token
from client.utils.mongodb import get_kv, delete_kv, update_kv

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
            
        for i in range (swarm['frames']):
            delete_kv('swarm_events', f'{swarm_id}_history_{i}')
        
        delete_kv('swarms', swarm_id)
         
        user_profile['swarm_ids'].pop(swarm_id)
        new_swarm_ids = user_profile['swarm_ids']
        updated_user_values = {
            'swarm_ids': new_swarm_ids, 
            'current_swarm_id': '', 
            'current_chat_id': '',
        }
        update_kv('user_profiles', user_id, updated_user_values)
        
        empty_swarm = {
            'swarm_id': 'swarm_id',
            'name': '',
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'root_node_id': '',
            'frames': 0,
            'owner': user_id,
            'queued_swarm_operations_ids': []
        }
        return {'user': get_kv('user_profiles', user_id), 'swarm': empty_swarm}
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


