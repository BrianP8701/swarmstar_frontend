from fastapi import FastAPI, Depends, APIRouter, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from app.utils.mongodb import get_kv, add_kv, update_kv
from app.utils.security.validate_token import validate_token
from app.swarmstar_api.handle_user_response import handle_user_response
from app.utils.security.uuid import generate_uuid

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
        chat['message_ids'].append(message_id)
        add_kv('swarm_messages', message_id, message)
        update_kv('swarm_chats', chat_id, chat)
        
        background_tasks.add_task(handle_user_response, chat_id, message)
        

        messages = []
        for message_id in chat['message_ids']:
            message = get_kv('swarm_messages', message_id)
            messages.append(message)
        chat.pop('message_ids', None)
        chat['messages'] = messages
        return {'chat': chat}
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
