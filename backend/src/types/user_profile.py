from pydantic import BaseModel

class UserProfile(BaseModel):
    id: str # username
    password: str
    user_id: str
