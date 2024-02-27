import os
from dotenv import load_dotenv
from swarmstar.swarm.config import configure_swarm

load_dotenv()

def find_available_swarm_folder():
    base_path = "my_swarms/swarm_"
    counter = 0
    while True:
        folder_path = f"{base_path}{counter}"
        if not os.path.exists(folder_path):
            return folder_path
        counter += 1
        
configure_swarm(
    openai_key=os.getenv('OPENAI_KEY'),
    root_path=find_available_swarm_folder(),
    platform="mac",
    mongodb_uri=os.getenv('MONGODB_URI'),
    mongodb_db_name=os.getenv('SWARM_DB_NAME')
)