"""
This module is responsible for spawning a new swarm 
when the user presses the spawn button in the UI.
"""
import os
from dotenv import load_dotenv

from swarmstar import spawn_swarm
from swarmstar.swarm.types import SwarmConfig, SwarmOperation

from server.communication.send_user_message import send_user_message
from client.utils.mongodb import get_kv, add_kv
from backend.local.server.utils.uuid import generate_uuid

load_dotenv()
db_name = os.getenv("SWARMSTAR_UI_DB_NAME")

def get_swarm_config():
    

async def spawn_swarm_root(user_id: str, goal: str):
    '''
    This is called when the user presses the spawn button
    '''
    swarm_config = SwarmConfig(**get_kv("swarm", "swarm", db_name='swarmstar_space'))

    root_swarm_operation = spawn_swarm(goal)
    await swarm_operation_queue.put((swarm_id, root_swarm_operation))