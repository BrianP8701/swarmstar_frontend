from pydantic import BaseModel

# Key is swarm_id
class Swarm(BaseModel):
    name: str # Swarm name
    goal: str # Swarm goal
    spawned: bool # True if swarm has been spawned
    swarm_users: list # List of user_ids