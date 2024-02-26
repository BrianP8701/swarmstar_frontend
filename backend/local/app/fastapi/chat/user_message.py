from fastapi import FastAPI, Depends, APIRouter, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from app.utils.mongodb import get_kv
from app.utils.security.validate_token import validate_token
from app.swarmapi.handle_user_response import handle_user_response

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class UserMessageRequest(BaseModel):
    chat_id: str
    message: Message

@router.post('/chat/user_message')
async def user_message(background_tasks: BackgroundTasks, user_message_request: UserMessageRequest, user_id: str = Depends(validate_token)):
    try:
        chat_id = user_message_request.chat_id
        message = user_message_request.message
    
        message = message.model_dump()
        
        if not chat_id or not message:
            raise HTTPException(status_code=400, detail="Chat ID and message is required")
        
        try:
            chat = get_kv('swarm_chats', chat_id)
        except:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        background_tasks.add_task(handle_user_response, chat_id, message)
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
