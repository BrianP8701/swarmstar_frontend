from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from app.fastapi.authentication.login import router as login_router
from app.fastapi.authentication.auth_token import router as auth_token_router
from app.fastapi.authentication.signup import router as signup_router

from backend.local.app.fastapi.swarm.create_swarm import router as create_swarm_router
from backend.local.app.fastapi.swarm.delete_swarm import router as delete_swarm_router
from app.api.spawn.get_swarm import router as get_swarm_router
from backend.local.app.fastapi.swarm.spawn_swarm import router as spawn_swarm_router

from backend.local.app.fastapi.chat.set_current_chat import router as get_chat_router
from backend.local.app.fastapi.chat.receive_user_message import router as user_message_router

from app.fastapi.websocket_manager import manager

app = FastAPI()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(client_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Process incoming messages if necessary
    except Exception as e:
        print(f"Error: {e}")
    finally:
        manager.disconnect(client_id)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(login_router)
app.include_router(auth_token_router)
app.include_router(signup_router)
app.include_router(create_swarm_router)
app.include_router(delete_swarm_router)
app.include_router(get_swarm_router)
app.include_router(spawn_swarm_router)
app.include_router(get_chat_router)
app.include_router(user_message_router)



