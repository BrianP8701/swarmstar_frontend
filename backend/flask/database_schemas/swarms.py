from pydantic import BaseModel
from typing import Dict, Optional

# Key is swarm_id
class Swarm(BaseModel):
    name: str # Swarm name
    goal: str # Swarm goal
    spawned: bool # True if swarm has been spawned
    active: bool
    conversation_ids: list # List of conversation_ids
    conversation_names: Dict[str, str] # Dict of conversation_id: conversation_name
    live_conversation_ids: list # List of conversation_ids
    terminated_conversation_ids: list # List of conversation_ids
    nodes: list # List of node_ids
    root_node_id: Optional[str] = None # Root node_id
    frames: int
