from fastapi import FastAPI, Depends, APIRouter, HTTPException
from pydantic import BaseModel

from backend.local.client.utils.validate_token import validate_token
from client.utils.mongodb import get_kv, update_kv

app = FastAPI()
router = APIRouter()

class SetCurrentChatRequest(BaseModel):
    chat_id: str

class SetCurrentChatResponse(BaseModel):
    chat: dict
    user: dict

@router.put('/chat/set_current_chat', response_model=SetCurrentChatResponse)
async def set_current_chat(request: SetCurrentChatRequest, user_id: str = Depends(validate_token)):
    try:        
        node_id = request.chat_id
        if not node_id:
            raise HTTPException(status_code=400, detail="Node ID is required")

        try:
            chat = get_kv('swarm_chats', node_id)
        except:
            raise HTTPException(status_code=404, detail="Chat not found")
            
        messages = []
        for message_id in chat['message_ids']:
            message = get_kv('swarm_messages', message_id)
            messages.append(message)
            
        
        updated_user_values = {'current_chat_id': node_id}
        ('user_profiles', user_id, updated_user_values)

        chat = get_kv('swarm_chats', node_id)
        del chat['message_ids']
        chat['messages'] = messages
        
        return {'chat': chat, 'user': get_kv('user_profiles', user_id)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


