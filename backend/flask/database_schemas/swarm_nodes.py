from pydantic import BaseModel
from typing import Optional, List

# Key is node_id
class SwarmNode(BaseModel):
    parent_id: Optional[str] = None
    children_ids: Optional[List[str]] = None
    action_id: str
    message: str
    report: Optional[str] = None
    alive: bool
    