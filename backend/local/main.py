from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth.login import router as login_router
from app.api.auth.auth_token import router as auth_token_router
from app.api.auth.signup import router as signup_router


app = FastAPI()

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
