from pydantic import BaseModel
from typing import List, Optional


class UserSwarm(BaseModel):
    id: str  # swarm_id
    name: str  # Swarm name
    goal: Optional[str] = None  # Swarm goal
    owner: str  # user_id
    spawned: bool = False
    active: bool = False
    complete: bool = False
    queued_swarm_operations_ids: List[str] = [] # List of swarm_operation_ids
    nodes_with_active_chat: List[str] = [] # List of node ids that are actively chatting
    nodes_with_terminated_chat: List[str] = [] # List of node ids that have terminated their chat
