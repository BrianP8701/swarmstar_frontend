from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import jwt  # This is from PyJWT
from jwt import PyJWTError  # Import specific exceptions from PyJWT
from datetime import datetime, timedelta
import os

load_dotenv()
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_token(user_id: str) -> str:
    ACCESS_TOKEN_EXPIRE_MINUTES = 60
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    token_data = {"user_id": user_id, "exp": expire.timestamp()}
    return jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)


def validate_token(token: str = Depends(oauth2_scheme)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if (
            user_id is None
            or datetime.fromtimestamp(payload.get("exp")) < datetime.utcnow()
        ):
            raise credentials_exception
    except PyJWTError:  # Catch exceptions specific to PyJWT
        raise credentials_exception
    return user_id
