from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth.login import router as login_router  # Example for importing a router

app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify your CORS settings here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT setup would be within your route handlers or dependencies

# Include routes from APIRouter instances
app.include_router(login_router)
# Repeat the above line for other routers like signup_router, etc.