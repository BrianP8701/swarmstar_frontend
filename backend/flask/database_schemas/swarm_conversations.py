from pydantic import BaseModel
from typing import List, Dict

# Key is conversation_id
class SwarmConversation(BaseModel):
    conversation_messages: Dict[str, List[str]] # Key is conversation_id, value is list of message_ids in correct order
    active: bool
