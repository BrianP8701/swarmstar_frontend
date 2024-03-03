from pydantic import BaseModel
from typing import Dict

class UserProfile(BaseModel):
    id: str # user_id
    swarm_ids: Dict[str, str]
    current_swarm_id: str
    current_chat_id: str
