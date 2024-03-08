from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List, Any

from src.utils.security import validate_token
from src.utils.database import get_user, get_swarm_node, get_swarm_config

router = APIRouter()


class SetCurrentNodeRequest(BaseModel):
    node_id: Optional[str] = None


class SetCurrentNodeResponse(BaseModel):
    node_logs: Optional[List[Dict[str, Any]]] = None

@router.put("/tree/set_current_node", response_model=SetCurrentNodeResponse)
async def set_current_node(
    set_current_node_request: SetCurrentNodeRequest,
    user_id: str = Depends(validate_token),
):
    try:
        node_id = set_current_node_request.node_id
        current_swarm_id = get_user(user_id).current_swarm_id
        
        node = get_swarm_node(get_swarm_config(current_swarm_id), node_id)
        
        return {
            "node_logs": node.developer_logs
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
