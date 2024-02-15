from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel

from app.utils.mongodb import get_kv, add_kv, update_kv, clean
from app.utils.security import generate_uuid

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Define your Pydantic models (schemas) for request and response data
class SwarmCreateRequest(BaseModel):
    swarm_name: str

class SwarmCreateResponse(BaseModel):
    swarm: dict
    user: dict

async def get_current_username(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, "YOUR_SECRET_KEY", algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception

@app.post('/spawn/create_swarm', response_model=SwarmCreateResponse)
async def create_swarm(swarm_create_request: SwarmCreateRequest, username: dict = Depends(get_current_username)):
    try:
        new_swarm_name = new_swarm_name = swarm_create_request.swarm_name
        
        if not new_swarm_name:
            print('swarm name is required')
            return {"error": "Swarm name is required"}, 400
        
        user = get_kv('users', username)
        
        if not user:
            return {"error": "User not found"}, 404
        
        swarm_id = generate_uuid(new_swarm_name)
        
        user['swarm_ids'].append(swarm_id)
        user['swarm_names'][swarm_id] = new_swarm_name
        user['current_swarm_id'] = swarm_id
        update_kv('users', username, user)
         
        new_swarm = {
            'name': new_swarm_name,
            'goal': '',
            'spawned': False,
            'active': False,
            'chat_ids': [],
            'chat_names': {},
            'live_chat_ids': [],
            'terminated_chat_ids': [],
            'nodes': [],
            'root_node_id': None,
            'frames': 0
        }
        
        add_kv('swarms', swarm_id, new_swarm)
        clean(new_swarm)
        clean(user)
        return {'swarm': new_swarm, 'user': user}, 200
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500
