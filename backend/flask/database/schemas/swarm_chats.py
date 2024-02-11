from pydantic import BaseModel
from typing import List, Dict

# Key is swarm_id
class SwarmChats(BaseModel):
    alive_agents: List[str] # List of agent_ids
    dead_agents: List[str] # List of agent_ids
    agent_names: Dict[str, str] # Key is agent_id, value is agent_name
    agent_messages: Dict[str, List[str]] # Key is agent_id, value is list of message_ids
    agent_statuses: Dict[str, str] # Key is agent_id, value is status 'alive' or 'dead'
