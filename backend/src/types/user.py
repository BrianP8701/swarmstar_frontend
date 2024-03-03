from pydantic import BaseModel
from typing import Dict, Optional


class User(BaseModel):
    id: str  # user_id
    swarm_ids: Dict[str, str]
    current_swarm_id: Optional[str] = None
    current_chat_id: Optional[str] = None
