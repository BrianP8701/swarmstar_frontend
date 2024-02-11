from pydantic import BaseModel

# Key is username
class UserAuth(BaseModel):
    password: str
    user_id: str
    openai_key: str
