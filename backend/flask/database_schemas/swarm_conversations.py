from pydantic import BaseModel
from typing import List, Dict

# Key is chat_id
class Swarmchat(BaseModel):
    chat_messages: Dict[str, List[str]] # Key is chat_id, value is list of message_ids in correct order
    alive: bool
