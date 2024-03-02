from pydantic import BaseModel
from typing import Dict

# Key is swarm_id
class Swarm(BaseModel):
    id: str
    name: str # Swarm name
    goal: str # Swarm goal
    spawned: bool # True if swarm has been spawned
    active: bool
    chat_ids: Dict[str, str] # Dict of chat_id: chat_name
    live_chat_ids: list # List of chat_ids
    terminated_chat_ids: list # List of chat_ids
    root_node_id: str
    frames: int
    owner: str # User_id
    queued_swarm_operations_ids: list # List of swarm_operation_ids
