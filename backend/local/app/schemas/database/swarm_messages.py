from pydantic import BaseModel
from typing import List, Dict

# Key is message_id
class SwarmMessage(BaseModel):
    role: str
    content: str