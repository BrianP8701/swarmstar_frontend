from pydantic import BaseModel
from typing import Dict, Optional

# Key is swarm_id
class Swarm(BaseModel):
    swarm_id: str
    name: str # Swarm name
    goal: str # Swarm goal
    spawned: bool # True if swarm has been spawned
    active: bool
    chat_ids: Dict[str, str] # Dict of chat_id: chat_name
    live_chat_ids: list # List of chat_ids
    terminated_chat_ids: list # List of chat_ids
    node_ids: list # List of node_ids
    frames: int
    owner: str # Username of swarm owner