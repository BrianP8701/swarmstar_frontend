from fastapi import FastAPI, Depends, APIRouter, HTTPException
from pydantic import BaseModel

from src.utils.security import validate_token
from src.utils.database import set_current_chat_id, get_node_chat
from src.types import NodeChat, User

app = FastAPI()
router = APIRouter()

class SetCurrentChatRequest(BaseModel):
    chat_id: str

class SetCurrentChatResponse(BaseModel):
    chat: NodeChat
    user: User

@router.put('/chat/set_current_chat', response_model=SetCurrentChatResponse)
async def set_current_chat(request: SetCurrentChatRequest, user_id: str = Depends(validate_token)):
    try:        
        node_id = request.chat_id
        
        if not node_id:
            raise HTTPException(status_code=400, detail="Node ID is required")

        try:
            chat = get_node_chat(node_id)
        except:
            raise HTTPException(status_code=404, detail="Chat not found")
            
        set_current_chat_id(user_id, node_id)

        return {'chat': chat, 'user': chat}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


