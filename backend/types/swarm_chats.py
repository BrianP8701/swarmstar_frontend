from pydantic import BaseModel
from typing import List, Optional
from swarmstar.swarm.types import UserCommunicationOperation

# Key is chat_id (chat_id is node_id)
class Swarmchat(BaseModel):
    id: str
    swarm_id: str
    message_ids: List[str] # List of message ids
    alive: bool
    node_id: str
    owner: str # user_id of chat owner
    user_communication_operation: Optional[UserCommunicationOperation] = None
