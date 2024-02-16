from pydantic import BaseModel
from typing import List
from enum import Enum

from app.schemas.database.swarm_nodes import SwarmNode

class LifecycleCommand(Enum):
    SPAWN= "spawn"
    EXECUTE = "execute"
    TERMINATE = "terminate"
    NODE_FAILURE = "node_failure"
    BLOCKING_OPERATION = "blocking_operation"

# key is swarm_id + '_history_{frame}'
class SwarmEvent(BaseModel):
    lifecycle_command: LifecycleCommand
    node: SwarmNode
