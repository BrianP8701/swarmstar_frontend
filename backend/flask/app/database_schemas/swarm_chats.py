from pydantic import BaseModel
from typing import List, Dict

# Key is chat_id
class Swarmchat(BaseModel):
    messages: List[str] # List of message_ids
    alive: bool
