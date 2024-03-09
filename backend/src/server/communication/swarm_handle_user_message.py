from swarmstar.types import ActionOperation
from swarmstar.utils.swarmstar_space import save_swarm_operation

from src.server.swarm_operation_queue import swarm_operation_queue
from src.utils.database import get_chat, get_message, update_chat, get_swarm_config


async def swarm_handle_user_message(swarm_id: str, node_id: str, message_id: str):
    chat = get_chat(node_id)
    message = get_message(message_id)

    user_communication_operation = chat.user_communication_operation

    return_operation = ActionOperation(
        node_id=chat.id,
        args={**{"user_response": message.content}, **user_communication_operation.context},
        function_to_call=user_communication_operation.next_function_to_call,
    )
    
    save_swarm_operation(get_swarm_config(swarm_id), return_operation)

    update_chat(chat.id, {"user_communication_operation": None})
    swarm_operation_queue.put_nowait((swarm_id, return_operation))
