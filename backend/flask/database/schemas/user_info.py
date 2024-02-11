from pydantic import BaseModel
from typing import Dict, List

# Key is user_id
class UserInfo(BaseModel):
    swarm_ids: List[str] # List of swarm_ids
    swarm_names: Dict[str, str] # Key is swarm_id, value is swarm_name
