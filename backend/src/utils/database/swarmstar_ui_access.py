import os
from dotenv import load_dotenv

from src.types import UserSwarm, User, UserProfile, SwarmMessage, Chat, NodeChat
from src.utils.database.mongodb import get_kv, add_kv, append_to_list, remove_from_list_by_value, update_kv, set_kv, delete_kv
from backend.src.utils.database.swarmstar_space_access import get_swarm_node, delete_swarm, get_swarm_node_ids
from src.utils.security import hash_password, generate_uuid

load_dotenv()
swarmstar_ui_db_name = os.getenv('SWARMSTAR_UI_DB_NAME')


"""
    User Access Methods
"""

def get_user_profile(username: str) -> UserProfile:
    return UserProfile(**get_kv(swarmstar_ui_db_name, "user_profiles", username))

def get_user(user_id: str) -> User:
    return User(**get_kv(swarmstar_ui_db_name, "users", user_id))

def create_new_user_profile(username: str, password: str) -> UserProfile:
    user_profile = UserProfile(
        id=generate_uuid("user"),
        username=username,
        password=hash_password(password)
    )
    add_kv(swarmstar_ui_db_name, "user_profiles", username, user_profile.model_dump())
    return user_profile

def create_new_user(user_profile: UserProfile) -> User:
    user = User(
        id=user_profile.id,
        swarm_ids={}
    )
    add_kv(swarmstar_ui_db_name, "users", user.id, user.model_dump())
    return user

def update_user(user_id: str, updated_values: dict) -> None:
    update_kv(swarmstar_ui_db_name, "users", user_id, updated_values)

def set_user(user: User) -> None:
    set_kv(swarmstar_ui_db_name, "users", user.id, user.model_dump())

def set_current_swarm_id(user_id: str, swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "user_profiles", user_id, {"current_swarm_id": swarm_id})

def set_current_chat_id(user_id: str, node_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "user_profiles", user_id, {"current_chat_id": node_id})




"""
    User Swarm Access Methods
"""

def get_user_swarm(swarm_id: str) -> UserSwarm:
    return UserSwarm(**get_kv(swarmstar_ui_db_name, "user_swarms", swarm_id))

def create_empty_user_swarm(user_id: str, swarm_id: str, name: str) -> None:
    user_swarm = UserSwarm(
        id=swarm_id, 
        name=name, 
        goal="", 
        spawned=False,
        active=False,
        complete=False,
        owner=user_id,
        queued_swarm_operations_ids=[],
        nodes_with_active_chat=[],
        nodes_with_terminated_chat=[]
    )
    add_kv(swarmstar_ui_db_name, "user_swarms", user_swarm.id, user_swarm.model_dump())
    user = get_user(user_id)
    user.swarm_ids[swarm_id] = name
    set_user(user)

def update_user_swarm_on_spawn(swarm_id: str, goal: str) -> None:
    update_kv(swarmstar_ui_db_name, "user_swarms", swarm_id, {
        "goal": goal,
        "spawned": True,
        "active": True,
        "complete": False
    })

def deactivate_user_swarm(swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "user_swarms", swarm_id, {"active": False})

def activate_user_swarm(swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "user_swarms", swarm_id, {"active": True})

def complete_user_swarm(swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "user_swarms", swarm_id, {"complete": True})

def append_queued_swarm_operation(swarm_id: str, swarm_operation_id: str) -> None:
    append_to_list(swarmstar_ui_db_name, "user_swarms", swarm_id, "queued_swarm_operations_ids", swarm_operation_id)

def remove_queued_swarm_operation(swarm_id: str, swarm_operation_id: str) -> None:
    remove_from_list_by_value(swarmstar_ui_db_name, "user_swarms", swarm_id, "queued_swarm_operations_ids", swarm_operation_id)

def update_user_swarm(swarm_id: str, updated_values: dict) -> None:
    update_kv(swarmstar_ui_db_name, "user_swarms", swarm_id, updated_values)

def delete_user_swarm(swarm_id: str) -> None:
    user_swarm = get_user_swarm(swarm_id)
    user = get_user(user_swarm.owner)
    node_ids = get_swarm_node_ids(swarm_id)
    for node_id in node_ids:
        message_ids = get_chat(node_id).message_ids
        for message_id in message_ids:
            delete_kv(swarmstar_ui_db_name, "messages", message_id)
        delete_kv(swarmstar_ui_db_name, "chats", node_id)

    delete_swarm(swarm_id)
    remove_from_list_by_value(swarmstar_ui_db_name, "users", user.id, "swarm_ids", swarm_id)



"""
    Chat Access Methods
"""

def get_chat(node_id: str) -> Chat:
    return Chat(**get_kv(swarmstar_ui_db_name, "chats", node_id))

def get_node_chat(node_id: str) -> NodeChat:
    chat = get_chat(node_id)
    node = get_swarm_node(node_id)
    
    chat = chat.model_dump()
    messages = []
    message_ids = chat.pop('message_ids')
    for message_id in message_ids:
        messages.append(get_message(message_id))
    chat.messages = messages
    chat.journal = node.journal
    return NodeChat(**chat)

def get_message(message_id: str):
    return get_kv(swarmstar_ui_db_name, "messages", message_id)

def create_empty_chat(swarm_id: str, node_id: str) -> None:
    chat = Chat(id=node_id, message_ids=[], alive=True)
    add_kv(swarmstar_ui_db_name, "chats", chat.id, chat.model_dump())
    append_to_list(swarmstar_ui_db_name, "user_swarms", swarm_id, "nodes_with_active_chat", chat.id)
    
def create_message(message: SwarmMessage) -> None:
    add_kv(swarmstar_ui_db_name, "messages", message.id, message.model_dump())

def append_message_to_chat(node_id: str, message_id: str) -> None:
    append_to_list(swarmstar_ui_db_name, "chats", node_id, "message_ids", message_id)

def terminate_chat(swarm_id: str, node_id: str) -> None:
    remove_from_list_by_value(swarmstar_ui_db_name, "user_swarms", swarm_id, "nodes_with_active_chat", node_id)
    append_to_list(swarmstar_ui_db_name, "user_swarms", swarm_id, "nodes_with_terminated_chat", node_id)
    update_kv(swarmstar_ui_db_name, "chats", node_id, {"alive": False})
