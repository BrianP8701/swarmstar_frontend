from fastapi import FastAPI, Depends, APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List

from app.utils.security.validate_token import validate_token
from app.utils.mongodb import get_kv, clean

app = FastAPI()
router = APIRouter()

class GetChatResponse(BaseModel):
    messages: List[dict]

@router.get('/chat/get_chat', response_model=GetChatResponse)
async def get_chat(chat_id: str = Query(None, description="The chat/node id"), username: str = Depends(validate_token)):
    try:        
        node_id = chat_id
        if not node_id:
            raise HTTPException(status_code=400, detail="Node ID is required")

        chat = get_kv('swarm_chats', node_id)
        
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
            
        messages = []
        for message_id in chat['messages']:
            message = get_kv('swarm_messages', message_id)
            messages.append(clean(message))

        return {'messages': messages}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


