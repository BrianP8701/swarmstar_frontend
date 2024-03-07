import os
from dotenv import load_dotenv

from swarmstar.types import SwarmConfig
from swarmstar.utils.swarmstar_space import get_swarm_state

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


def set_current_swarm_id(user_id: str, swarm_id: str) -> None:
    update_kv(
        swarmstar_ui_db_name, "users", user_id, {"current_swarm_id": swarm_id}
    )

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

    delete_kv(swarmstar_ui_db_name, "swarms", swarm_id)
    user.swarm_ids.pop(swarm_id)
    
    if user.current_swarm_id == swarm_id:
        user.current_swarm_id = None
    set_user(user)

    if user_swarm.spawned: 
        node_ids = get_swarm_state(swarm_config)
        for node_id in node_ids:
            message_ids = get_chat(node_id).message_ids
            for message_id in message_ids:
                delete_kv(swarmstar_ui_db_name, "messages", message_id)
            delete_kv(swarmstar_ui_db_name, "chats", node_id)
        delete_swarmstar_space(swarm_config)







"""
    Chat Access Methods
"""


def does_chat_exist(node_id: str) -> bool:
    return does_kv_exist(swarmstar_ui_db_name, "chats", node_id)


def get_chat(node_id: str) -> Chat:
    return Chat(**get_kv(swarmstar_ui_db_name, "chats", node_id))


def get_node_chat(node_id: str) -> NodeChat:
    chat = get_chat(node_id)
    node = get_swarm_node(node_id)

    chat = chat.model_dump()
    messages = []
    message_ids = chat.pop("message_ids")
    for message_id in message_ids:
        messages.append(get_message(message_id))
    chat.messages = messages
    return NodeChat(**chat)


def get_message(message_id: str) -> SwarmMessage:
    return SwarmMessage(**get_kv(swarmstar_ui_db_name, "messages", message_id))


def create_empty_chat(swarm_id: str, node_id: str) -> Chat:
    chat = Chat(id=node_id, message_ids=[], alive=True)
    add_kv(swarmstar_ui_db_name, "chats", chat.id, chat.model_dump())
    append_to_list(
        swarmstar_ui_db_name, "swarms", swarm_id, "nodes_with_active_chat", chat.id
    )
    return chat


def create_swarm_message(chat_id: str, message: SwarmMessage) -> None:
    add_kv(swarmstar_ui_db_name, "messages", message.id, message.model_dump())
    append_to_list(swarmstar_ui_db_name, "chats", chat_id, "message_ids", message.id)


def terminate_chat(swarm_id: str, node_id: str) -> None:
    remove_from_list_by_value(
        swarmstar_ui_db_name, "swarms", swarm_id, "nodes_with_active_chat", node_id
    )
    append_to_list(
        swarmstar_ui_db_name, "swarms", swarm_id, "nodes_with_terminated_chat", node_id
    )
    update_kv(swarmstar_ui_db_name, "chats", node_id, {"alive": False})


def update_chat(node_id: str, updated_values: dict) -> None:
    update_kv(swarmstar_ui_db_name, "chats", node_id, updated_values)
