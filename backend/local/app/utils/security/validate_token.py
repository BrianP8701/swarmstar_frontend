from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt  # This is from PyJWT
from jwt import PyJWTError  # Import specific exceptions from PyJWT
from datetime import datetime, timedelta
import os

SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def validate_token(token: str = Depends(oauth2_scheme)):
    print('we getting in here the validate token?')
    print(token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or datetime.fromtimestamp(payload.get("exp")) < datetime.utcnow():
            print(username)
            print(datetime.fromtimestamp(payload.get("exp")))
            raise credentials_exception
    except PyJWTError:  # Catch exceptions specific to PyJWT
        print('ahhhhhh')
        raise credentials_exception
    print(username)
    return username
