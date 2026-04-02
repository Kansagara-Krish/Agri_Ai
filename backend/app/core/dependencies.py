from fastapi import Header, HTTPException
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import AsyncSessionLocal
import firebase_admin
from firebase_admin import auth

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

async def verify_token(authorization: str = Header(None)):
    """
    Dependency to verify a token. For hackathon, if firebase app is not fully
    initialized or authorization header is missing or dummy "Bearer test-token",
    we don't strictly enforce in order to not block development.
    Replace with strict logic for production.
    """
    if not authorization:
        # Instead of strict 401, we pass optionally or raise exception in strict mode.
        return None
    
    if authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
    else:
        token = authorization

    # Stub mode: accept any string
    if token == "test-token" or not firebase_admin._apps:
        return {"uid": "stub_user_123", "email": "test@example.com"}

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
