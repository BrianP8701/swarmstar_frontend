from fastapi import FastAPI, Depends, APIRouter, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from utils.db_utils import get_frontend_chat
from utils.mongodb import get_kv, add_kv, append_to_list_with_versioning
from utils.security.validate_token import validate_token
from swarmstar_api.handle_user_response import handle_user_response
from utils.security.uuid import generate_uuid

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class UserMessageRequest(BaseModel):
    chat_id: str
    message: Message
    
class UserMessageResponse(BaseModel):
    chat: dict

@router.put('/chat/handle_user_message')
async def handle_user_message(background_tasks: BackgroundTasks, user_message_request: UserMessageRequest, user_id: str = Depends(validate_token)):
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
        
        message_id = generate_uuid('message')
        add_kv('swarm_messages', message_id, message)
        append_to_list_with_versioning('swarm_chats', chat_id, 'message_ids', message_id)
        
        background_tasks.add_task(handle_user_response, chat_id, message)
        
        return {'chat': get_frontend_chat(chat_id)}
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
