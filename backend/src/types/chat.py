from pydantic import BaseModel, Field
from typing import Optional, List, Any, Dict

from swarmstar.swarm.types import UserCommunicationOperation

from src.utils.security.generate_uuid import generate_uuid


class SwarmMessage(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: generate_uuid("message"))
    role: str
    content: str


class Chat(BaseModel):
    id: str  # node_id
    message_ids: List[str]  # List of message ids
    alive: bool
    user_communication_operation: Optional[UserCommunicationOperation] = None


class NodeChat(BaseModel):
    id: str  # node_id
    messages: List[SwarmMessage]  # List of messages
    journal: List[Dict[str, Any]] = []
    alive: bool
