"""
This module is responsible for spawning a new swarm 
when the user presses the spawn button in the UI.
"""
from swarmstar import spawn_swarm as swarmstar_spawn_swarm

from src.utils.database import get_swarm_config
from src.server.swarm_operation_queue import swarm_operation_queue

async def spawn_swarm(swarm_id: str, goal: str):
    '''
    This is called when the user presses the spawn button
    '''
    swarm_config = get_swarm_config("default_config")
    root_swarm_operation = swarmstar_spawn_swarm(swarm_config, goal)
    await swarm_operation_queue.put((swarm_id, root_swarm_operation.id))
