from pydantic import BaseModel
from typing import List, Dict

# Key is username
class User(BaseModel):
    user_id: str
    hashed_password: str

    