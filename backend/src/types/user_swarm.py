from pydantic import BaseModel
from typing import List, Optional, Dict


class UserSwarm(BaseModel):
    id: str  # swarm_id
    name: str  # Swarm name
    goal: Optional[str] = None  # Swarm goal
    owner: str  # user_id
    spawned: bool = False
    active: bool = False
    complete: bool = False
    queued_swarm_operations_ids: List[str] = [] # List of swarm_operation_ids
    nodes_with_active_chat: Dict[str, str] = {} # Dict of node ids to chat names that are active
    nodes_with_terminated_chat: Dict[str, str] = {} # Dict of node ids to chat names that have terminated their chat
