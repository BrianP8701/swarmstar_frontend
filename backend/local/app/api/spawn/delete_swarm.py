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
class SwarmDeleteRequest(BaseModel):
    swarm_id: str

class SwarmDeleteResponse(BaseModel):
    swarm: dict
    user: dict

@app.post('/spawn/delete_swarm', response_model=SwarmDeleteResponse)
async def delete_swarm(swarm_delete_request: SwarmDeleteRequest, username: str = Depends(validate_token)):
    try:
        swarm_id = swarm_delete_request.swarm_id
        
        if not swarm_id:
            raise HTTPException(status_code=400, detail="Swarm ID is required")

        user = get_kv('users', username)
        if swarm_id not in user['swarm_ids']:
            raise HTTPException(status_code=403, detail="User is not part of the swarm")
                
        swarm = get_kv('swarms', swarm_id)
        print(swarm)
        chat_ids = swarm['chat_ids']
        
        for chat_id in chat_ids:
            chat = get_kv('swarm_chats', chat_id)
            for message_id in chat['messages']:
                delete_kv('swarm_messages', message_id)
            delete_kv('swarm_chats', chat_id)
            
        for node_id in swarm['nodes']:
            delete_kv('swarm_nodes', node_id)
            
        for i in range (swarm['frames']):
            delete_kv('swarm_events', f'{swarm_id}_history_{i}')
        
        delete_kv('swarms', swarm_id)
        
        user['swarm_ids'].remove(swarm_id)
        user['swarm_names'].pop(swarm_id)
        update_kv('users', username, user)
        
        empty_swarm = {
            'name': '',
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
        clean(user)
        clean(empty_swarm)
        user['username'] = username
        return {'user': backend_user_to_frontend_user(user), 'swarm': empty_swarm}, 200
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

