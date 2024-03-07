from fastapi import Depends, APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

from src.server.communication.swarm_handle_user_message import swarm_handle_user_message
from src.utils.database import create_swarm_message, get_node_chat, get_user
from src.utils.security import validate_token
from src.types import SwarmMessage, NodeChat

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class UserMessageRequest(BaseModel):
    chat_id: str
    message: Message


class UserMessageResponse(BaseModel):
    chat: NodeChat


@router.put("/chat/handle_user_message")
async def handle_user_message(
    background_tasks: BackgroundTasks,
    user_message_request: UserMessageRequest,
    user_id: str = Depends(validate_token),
):
    try:
        chat_id = user_message_request.chat_id
        message = user_message_request.message.model_dump()

        if not chat_id or not message:
            raise HTTPException(
                status_code=400, detail="Chat ID and message is required"
            )

        message = SwarmMessage(**message)
        create_swarm_message(chat_id, message)

        user = get_user(user_id)
        background_tasks.add_task(
            swarm_handle_user_message, user.current_swarm_id, chat_id, message.id
        )

        return {"chat": get_node_chat(chat_id)}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
