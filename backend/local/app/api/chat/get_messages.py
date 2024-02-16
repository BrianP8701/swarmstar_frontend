from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query
from pydantic import BaseModel

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import get_kv, clean

app = FastAPI()
router = APIRouter()

class GetMessagesResponse(BaseModel):
    swarm: dict
    user: dict

@router.get('/chat/get_messages', response_model=GetMessagesResponse)
async def get_messages(node_id: str = Query(None, description="The chat/node id"), username: str = Depends(validate_token)):
    try:        
        if not node_id:
            raise HTTPException(status_code=400, detail="Node ID is required")

        chat = get_kv('swarm_chats', node_id)
        
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        messages = []
        
        for message_id in chat['messages']:
            message = get_kv('swarm_messages', message_id)
            messages.append(clean(message))
            
        return {'messages': messages, 'node_id': node_id}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

