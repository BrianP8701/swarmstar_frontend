from pydantic import BaseModel
from typing import Dict

# Key is user_id
class User_Profile(BaseModel):
    username: str
    swarm_ids: Dict[str, str]
    current_swarm_id: str
    current_chat_id: str
