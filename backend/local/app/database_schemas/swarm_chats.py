from pydantic import BaseModel
from typing import List, Dict

# Key is chat_id (chat_id is node_id)
class Swarmchat(BaseModel):
    message_ids: List[str] # List of message ids
    alive: bool
    node_id: str
    owner: str
