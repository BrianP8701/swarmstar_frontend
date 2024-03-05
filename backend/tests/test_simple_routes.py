"""
This module tests client side endpoints expect for the 
spawn swarm endpoint.
"""
import pytest
from fastapi.testclient import TestClient
from main import app

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

@pytest.mark.unit
@pytest.mark.fast
def test_set_current_swarm(token, swarm_id):
    response = client.put(
        "/swarm/set_current_swarm",
        json={"swarm_id": None},
        headers={"Authorization": f"Bearer {token}"}
    )

    if response.status_code != 200:
        print(f"Signup failed: {response.json()}")
    assert response.status_code == 200

    user = User(**response.json()["user"])

    assert "swarm" in response.json()
    assert "user" in response.json()

    user = User(**response.json()["user"])
    assert user.current_swarm_id == None
    assert response.json()["swarm"] == None

    response = client.put(
        "/swarm/set_current_swarm",
        json={"swarm_id": swarm_id},
        headers={"Authorization": f"Bearer {token}"}
    )

    if response.status_code != 200:
        print(f"Setting current swarm failed: {response.json()}")
    assert response.status_code == 200

    user = User(**response.json()["user"])
    swarm = UserSwarm(**response.json()["swarm"])

    assert "swarm" in response.json()
    assert "user" in response.json()

    user = User(**response.json()["user"])
    swarm = UserSwarm(**response.json()["swarm"])

    assert user.current_swarm_id == swarm_id
    assert swarm.id == swarm_id
    assert swarm.name == "testswarm1"
    assert swarm.owner == user.id
