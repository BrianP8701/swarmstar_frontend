from pydantic import BaseModel
from typing import List, Dict

# Key is node_id
class Swarmchat(BaseModel):
    messages: List[str] # List of message_ids
    alive: bool
    owner: str