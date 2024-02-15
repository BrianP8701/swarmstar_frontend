from pydantic import BaseModel
from typing import Dict, Optional

# Key is swarm_id
class Swarm(BaseModel):
    name: str # Swarm name
    goal: str # Swarm goal
    spawned: bool # True if swarm has been spawned
    active: bool
    chat_ids: list # List of chat_ids
    chat_names: Dict[str, str] # Dict of chat_id: chat_name
    live_chat_ids: list # List of chat_ids
    terminated_chat_ids: list # List of chat_ids
    nodes: list # List of node_ids
    root_node_id: Optional[str] = None # Root node_id
    frames: int