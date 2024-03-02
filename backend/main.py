from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio

from client.authentication.login import router as login_router
from client.authentication.auth_token import router as auth_token_router
from client.authentication.signup import router as signup_router

from client.swarm.create_swarm import router as create_swarm_router
from client.swarm.delete_swarm import router as delete_swarm_router
from client.swarm.set_current_swarm import router as set_current_swarm_router
from client.swarm.spawn_swarm import router as spawn_swarm_router
from client.swarm.update_swarm import router as update_swarm_router

from client.chat.set_current_chat import router as set_current_chat_router
from client.chat.handle_user_message import router as handle_user_message_router

from client.user.update_user import router as update_user_router

from server.websocket_manager import manager

from server.swarm_operation_queue import swarm_operation_queue_worker, swarm_operation_queue

@asynccontextmanager
async def lifespan(app: FastAPI):
    worker_task = asyncio.create_task(swarm_operation_queue_worker())
    yield
    # Cancel the worker task to stop fetching new operations
    worker_task.cancel()
    try:
        await worker_task
    except asyncio.CancelledError:
        pass
    # Wait for all remaining operations to be processed
    await asyncio.sleep(1)  # Small delay to allow queue to empty, adjust as needed
    while not swarm_operation_queue.empty():
        await asyncio.sleep(0.1)  # Adjust sleep time as necessary


app = FastAPI(lifespan=lifespan, debug=True)

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
app.include_router(set_current_swarm_router)
app.include_router(spawn_swarm_router)
app.include_router(update_swarm_router)
app.include_router(set_current_chat_router)
app.include_router(handle_user_message_router)
app.include_router(update_user_router)
