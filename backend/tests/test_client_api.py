from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_signup():
    response = client.put(
        "/auth/signup",
        json={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "token" in response.json()
