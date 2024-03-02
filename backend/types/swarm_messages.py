from pydantic import BaseModel, Field
from typing import Optional

from backend.local.server.utils.uuid import generate_uuid

# Key is message_id
class Message(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: generate_uuid('action'))
    role: str
    content: str
