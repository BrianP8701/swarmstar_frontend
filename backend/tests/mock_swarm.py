import pytest
from fastapi.testclient import TestClient
from main import app
import time

from swarmstar.types import UserCommunicationOperation, SpawnOperation, TerminationOperation, NodeEmbryo

from src.server.swarm_operation_queue import swarm_operation_queue
from src.utils.database import create_empty_user_swarm, get_swarm_state, get_swarm_config, get_swarm_node
from src.types import UserSwarm, User
from src.utils.security import validate_token

client = TestClient(app)

@pytest.fixture(scope="module")
def create_test_user():
    response = client.put(
        "/auth/signup",
        json={"username": "testuser", "password": "testpassword"}
    )
    if response.status_code != 200:
        print(f"Signup failed: {response.json()}")
    assert response.status_code == 200

    assert "token" in response.json()
    
    token = validate_token(response.json()["token"])

@pytest.fixture(scope="module")
def token(create_test_user):
    response = client.post(
        "/auth/login",
        json={"username": "testuser", "password": "testpassword"}
    )
    if response.status_code != 200:
        print(f"Signup failed: {response.json()}")
    assert response.status_code == 200

    assert "token" in response.json()

    token = response.json()["token"]
    yield token
    
    response = client.delete(
        "/user/delete_user",
        headers={"Authorization": f"Bearer {token}"}
    )
    if response.status_code != 200:
        print(f"User deletion failed: {response.json()}")
    assert response.status_code == 200
    
@pytest.fixture(scope="module")
def swarm_id(token):
    response = client.post(
        "/swarm/create_swarm",
        json={"swarm_name": "testswarm1"},
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code != 200:
        print(f"Signup failed: {response.json()}")
    assert response.status_code == 200

    assert "swarm" in response.json()
    assert "user" in response.json()
    
    user = User(**response.json()["user"])
    swarm = UserSwarm(**response.json()["swarm"])
    swarm_ids = user.swarm_ids
    
    assert "testswarm1" in swarm_ids.values()
    assert type(swarm.id) == str
    
    swarm_id = swarm.id
    expected_swarm = UserSwarm(
        id=swarm_id,
        name="testswarm1",
        owner=user.id,
    )
    
    assert swarm == expected_swarm
    
    yield swarm_id
    
    response = client.delete(
        f"/swarm/delete_swarm/{swarm_id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code != 200:
        print(f"Signup failed: {response.json()}")
    assert response.status_code == 200

    assert "swarm" in response.json()
    assert "user" in response.json()

    user = User(**response.json()["user"])
    
    assert user.current_swarm_id == None
    assert swarm_id not in user.swarm_ids
    assert "testswarm1" not in user.swarm_ids.values()
    assert response.json()["swarm"] == None

@pytest.mark.slow
def test_mock_swarm(swarm_id):
    goal = "this is a mock test swarm."
    
    user_comm_node_1 = SpawnOperation(
        node_embryo=NodeEmbryo(
            action_id="swarmstar/actions/reasoning/decompose_directive",
            message="Determine the users favorite color and favorite food."
        )
    )
    
    user_comm_node_2 = SpawnOperation(
        node_embryo=NodeEmbryo(
            action_id="swarmstar/actions/reasoning/decompose_directive",
            message="Determine what the user is doing right now."
        )
    )

    swarm_operation_queue.put_nowait((swarm_id, user_comm_node_1))
    swarm_operation_queue.put_nowait((swarm_id, user_comm_node_2))

    time.sleep(1)
    swarm_config = get_swarm_config("default_config")
    swarm_config.id = swarm_id
    
    node_ids = get_swarm_state(swarm_config)
    
    while True:
        if get_swarm_node(swarm_config, node_ids[0]).alive:
            time.sleep(1)
        elif get_swarm_node(swarm_config, node_ids[1]).alive:
            break
        else:
            time.sleep(1)
