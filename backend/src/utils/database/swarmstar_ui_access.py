import os
from dotenv import load_dotenv
import copy

from swarmstar.types import SwarmConfig
from swarmstar.utils.swarmstar_space import get_swarm_state, get_swarm_operation

from src.utils.database.swarmstar_space_access import get_current_swarm_state_representation, duplicate_swarm

from src.types import UserSwarm, User, UserProfile, SwarmMessage, Chat, NodeChat
from src.utils.database.mongodb import (
    get_kv,
    add_kv,
    append_to_list,
    remove_from_list_by_value,
    update_kv,
    set_kv,
    delete_kv,
    does_kv_exist
)
from src.utils.database.swarmstar_space_access import (
    get_swarm_node,
    delete_swarmstar_space,
    get_swarm_config
)
from src.utils.security import hash_password, generate_uuid

load_dotenv()
swarmstar_ui_db_name = os.getenv("SWARMSTAR_UI_DB_NAME")


"""
    User Access Methods
"""


def get_user_profile(username: str) -> UserProfile:
    return UserProfile(**get_kv(swarmstar_ui_db_name, "user_profiles", username))


def get_user(user_id: str) -> User:
    user = get_kv(swarmstar_ui_db_name, "users", user_id)
    return User(**get_kv(swarmstar_ui_db_name, "users", user_id))


def create_new_user_profile(username: str, password: str) -> UserProfile:
    user_profile = UserProfile(
        id=username, password=hash_password(password), user_id=generate_uuid("user")
    )
    add_kv(swarmstar_ui_db_name, "user_profiles", username, user_profile.model_dump())
    return user_profile


def create_new_user(user_profile: UserProfile) -> User:
    user = User(id=user_profile.user_id, swarm_ids={}, username=user_profile.id)
    add_kv(swarmstar_ui_db_name, "users", user.id, user.model_dump())
    return user


def update_user(user_id: str, updated_values: dict) -> None:
    update_kv(swarmstar_ui_db_name, "users", user_id, updated_values)


def set_user(user: User) -> None:
    set_kv(swarmstar_ui_db_name, "users", user.id, user.model_dump())


def set_current_swarm(user_id: str, swarm_id: str) -> None:
    update_kv(
        swarmstar_ui_db_name, "users", user_id, {"current_swarm_id": swarm_id}
    )
    if swarm_id:
        user_swarm = get_user_swarm(swarm_id)
        if user_swarm.spawned:
            return get_current_swarm_state_representation(swarm_id)
        else:
            return None

def set_current_chat_id(user_id: str, node_id: str) -> None:
    update_kv(
        swarmstar_ui_db_name, "users", user_id, {"current_chat_id": node_id}
    )
    
def delete_user(user_id: str) -> None:
    user = get_user(user_id)
    username = user.username
    for swarm_id in user.swarm_ids:
        delete_user_swarm(swarm_id)
    delete_kv(swarmstar_ui_db_name, "users", user_id)
    delete_kv(swarmstar_ui_db_name, "user_profiles", username)






"""
    User Swarm Access Methods
"""


def get_user_swarm(swarm_id: str) -> UserSwarm:
    return UserSwarm(**get_kv(swarmstar_ui_db_name, "swarms", swarm_id))


def create_empty_user_swarm(user_id: str, name: str) -> UserSwarm:
    user_swarm = UserSwarm(
        id=generate_uuid("swarm"),
        name=name,
        owner=user_id
    )
    add_kv(swarmstar_ui_db_name, "swarms", user_swarm.id, user_swarm.model_dump())
    user = get_user(user_id)
    user.swarm_ids[user_swarm.id] = name
    user.current_swarm_id = user_swarm.id
    set_user(user)
    return user_swarm

def copy_swarm(user_id: str, swarm_name: str, old_swarm_id: str):
    try:
        old_swarm = get_user_swarm(old_swarm_id)
        swarm_copy = copy.deepcopy(old_swarm)
        swarm_copy.id = generate_uuid("swarm")
        swarm_copy.name = swarm_name
        add_kv(swarmstar_ui_db_name, "swarms", swarm_copy.id, swarm_copy.model_dump())
        user = get_user(user_id)
        user.swarm_ids[swarm_copy.id] = swarm_name
        user.current_swarm_id = swarm_copy.id
        set_user(user)
        if swarm_copy.spawned:
            swarm_copy.nodes_with_active_chat = {}
            for chat_id in old_swarm.nodes_with_active_chat.keys():
                old_chat = get_chat(chat_id)
                chat = copy.deepcopy(old_chat)
                chat.id = generate_uuid("chat")
                swarm_copy.nodes_with_active_chat[chat.id] = old_swarm.nodes_with_active_chat[chat_id]
                chat.message_ids = []
                for message_id in old_chat.message_ids:
                    message = get_message(message_id)
                    message.id = generate_uuid("message")
                    chat.message_ids.append(message.id)
                    add_kv(swarmstar_ui_db_name, "messages", message.id, message.model_dump())
                add_kv(swarmstar_ui_db_name, "chats", chat.id, chat.model_dump())
            
            swarm_copy.nodes_with_terminated_chat = {}
            for chat_id in old_swarm.nodes_with_terminated_chat.keys():
                old_chat = get_chat(chat_id)
                chat = copy.deepcopy(old_chat)
                chat.id = generate_uuid("chat")
                swarm_copy.nodes_with_terminated_chat[chat.id] = old_swarm.nodes_with_terminated_chat[chat_id]
                chat.message_ids = []
                for message_id in old_chat.message_ids:
                    message = get_message(message_id)
                    message.id = generate_uuid("message")
                    chat.message_ids.append(message.id)
                add_kv(swarmstar_ui_db_name, "chats", chat.id, chat.model_dump())
            
            set_kv(swarmstar_ui_db_name, "swarms", swarm_copy.id, swarm_copy.model_dump())
            duplicate_swarm(old_swarm_id, swarm_copy.id)
        return swarm_copy
    except Exception as e:
        raise e

def update_user_swarm_on_spawn(swarm_id: str, goal: str) -> None:
    update_kv(
        swarmstar_ui_db_name,
        "swarms",
        swarm_id,
        {"goal": goal, "spawned": True, "active": True, "complete": False},
    )


def deactivate_user_swarm(swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "swarms", swarm_id, {"active": False})


def activate_user_swarm(swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "swarms", swarm_id, {"active": True})


def complete_user_swarm(swarm_id: str) -> None:
    update_kv(swarmstar_ui_db_name, "swarms", swarm_id, {"complete": True})


def append_queued_swarm_operation(swarm_id: str, swarm_operation_id: str) -> None:
    append_to_list(
        swarmstar_ui_db_name,
        "swarms",
        swarm_id,
        "queued_swarm_operations_ids",
        swarm_operation_id,
    )


def remove_queued_swarm_operation(swarm_id: str, swarm_operation_id: str) -> None:
    remove_from_list_by_value(
        swarmstar_ui_db_name,
        "swarms",
        swarm_id,
        "queued_swarm_operations_ids",
        swarm_operation_id,
    )


def update_user_swarm(swarm_id: str, updated_values: dict) -> None:
    update_kv(swarmstar_ui_db_name, "swarms", swarm_id, updated_values)


def delete_user_swarm(swarm_id: str) -> None:
    user_swarm = get_user_swarm(swarm_id)
    swarm_config = get_swarm_config(swarm_id)
    user = get_user(user_swarm.owner)

    node_ids_with_chats = list(user_swarm.nodes_with_active_chat.keys()) + list(user_swarm.nodes_with_terminated_chat.keys())
    for node_id in node_ids_with_chats:
        for message_id in get_chat(node_id).message_ids:
            delete_kv(swarmstar_ui_db_name, "messages", message_id)
        delete_kv(swarmstar_ui_db_name, "chats", node_id)

    delete_kv(swarmstar_ui_db_name, "swarms", swarm_id)
    user.swarm_ids.pop(swarm_id)
    
    if user.current_swarm_id == swarm_id:
        user.current_swarm_id = None
    set_user(user)

    if user_swarm.spawned: 
        delete_swarmstar_space(swarm_config)






"""
    Chat Access Methods
"""


def does_chat_exist(node_id: str) -> bool:
    """
    Checks if the given node has a chat in the UI database.
    """
    return does_kv_exist(swarmstar_ui_db_name, "chats", node_id)


def get_chat(node_id: str) -> Chat:
    return Chat(**get_kv(swarmstar_ui_db_name, "chats", node_id))


def get_node_chat(node_id: str) -> NodeChat:
    try:
        chat = get_chat(node_id)

        chat = chat.model_dump()
        messages = []
        message_ids = chat.pop("message_ids")
        for message_id in message_ids:
            messages.append(get_message(message_id))
        chat["messages"] = messages
        return NodeChat(**chat)
    except Exception as e:
        print('Error in get_node_chat:\n', e)
        raise e

def get_message(message_id: str) -> SwarmMessage:
    return SwarmMessage(**get_kv(swarmstar_ui_db_name, "messages", message_id))


def create_empty_chat(swarm_id: str, node_id: str) -> Chat:
    chat = Chat(id=node_id, message_ids=[], alive=True)
    add_kv(swarmstar_ui_db_name, "chats", chat.id, chat.model_dump())
    
    user_swarm = get_user_swarm(swarm_id)
    node = get_swarm_node(get_swarm_config(swarm_id), node_id)

    user_swarm.nodes_with_active_chat[node_id] = node.name
    set_kv(swarmstar_ui_db_name, "swarms", swarm_id, user_swarm.model_dump())
    print(f"Created chat in swarm: {user_swarm.model_dump()}")
    return chat


def create_swarm_message(chat_id: str, message: SwarmMessage) -> None:
    add_kv(swarmstar_ui_db_name, "messages", message.id, message.model_dump())
    append_to_list(swarmstar_ui_db_name, "chats", chat_id, "message_ids", message.id)


def terminate_chat(swarm_id: str, node_id: str) -> None:
    """
    Update chat and swarm object in database to reflect that the chat is terminated.
    """
    user_swarm = get_user_swarm(swarm_id)
    nodes_with_active_chat = user_swarm.nodes_with_active_chat
    nodes_with_terminated_chat = user_swarm.nodes_with_terminated_chat
    
    nodes_with_terminated_chat[node_id] = nodes_with_active_chat.pop(node_id)
    
    set_kv(swarmstar_ui_db_name, "swarms", swarm_id, user_swarm.model_dump())
    update_chat(node_id, {"alive": False})

def update_chat(node_id: str, updated_values: dict) -> None:
    update_kv(swarmstar_ui_db_name, "chats", node_id, updated_values)






