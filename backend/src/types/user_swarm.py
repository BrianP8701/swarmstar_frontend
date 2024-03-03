from pydantic import BaseModel
from typing import List


class UserSwarm(BaseModel):
    id: str  # swarm_id
    name: str  # Swarm name
    goal: str  # Swarm goal
    spawned: bool
    active: bool
    complete: bool
    owner: str  # User_id
    queued_swarm_operations_ids: list  # List of swarm_operation_ids
    nodes_with_active_chat: List[str]  # List of node ids that are actively chatting
    nodes_with_terminated_chat: List[
        str
    ]  # List of node ids that have terminated their chat
