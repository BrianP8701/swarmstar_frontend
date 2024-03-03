from pydantic import BaseModel

class User(BaseModel):
    id: str # username
    hashed_password: str
    user_id: str

    