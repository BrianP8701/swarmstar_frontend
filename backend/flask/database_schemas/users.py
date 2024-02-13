from pydantic import BaseModel
from typing import List, Dict

# Key is username
class Users(BaseModel):
    password: str
    user_id: str
    openai_key: str
    swarm_ids: List[str] # List of swarm_ids
    swarm_names: Dict[str, str] # Dict of swarm_id: swarm_name
    