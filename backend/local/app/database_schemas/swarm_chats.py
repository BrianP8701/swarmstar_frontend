from pydantic import BaseModel
from typing import List, Dict

# Key is chat_id (chat_id is node_id)
class Swarmchat(BaseModel):
    messages: List[Dict[str, str]] # List of messages
    alive: bool
    node_id: str
    owner: str