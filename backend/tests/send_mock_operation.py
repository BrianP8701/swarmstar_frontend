import asyncio
from swarmstar.types import UserCommunicationOperation, SpawnOperation, TerminationOperation, NodeEmbryo

async def send_mock_operations():
    # Import the necessary objects from your main FastAPI app
    from main import swarm_operation_queue

    swarm_id = ""
    
    # Create mock swarm operations
    user_comm_node_1 = SpawnOperation(
        node_embryo=NodeEmbryo(
            action_id="swarmstar/actions/reasoning/decompose_directive",
            message="Determine the user's favorite color and favorite food."
        )
    )

    user_comm_node_2 = SpawnOperation(
        node_embryo=NodeEmbryo(
            action_id="swarmstar/actions/reasoning/decompose_directive",
            message="Determine what the user is doing right now."
        )
    )

    # Put the mock operations into the swarm_operation_queue
    swarm_operation_queue.put_nowait((swarm_id, user_comm_node_1))
    swarm_operation_queue.put_nowait((swarm_id, user_comm_node_2))

    print("Mock swarm operations sent.")

if __name__ == "__main__":
    asyncio.run(send_mock_operations())