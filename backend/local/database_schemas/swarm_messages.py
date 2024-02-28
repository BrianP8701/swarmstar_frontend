from pydantic import BaseModel
from typing import List

# Key is message_id
class Message(BaseModel):
    role: str
    content: str
