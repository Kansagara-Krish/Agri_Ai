import firebase_admin
from firebase_admin import credentials
from app.core.config import settings

def init_firebase():
    if settings.firebase_credentials:
        try:
            cred = credentials.Certificate(settings.firebase_credentials)
            firebase_admin.initialize_app(cred)
            print("Firebase initialized with credentials.")
        except Exception as e:
            print(f"Failed to initialize Firebase: {e}")
    else:
        # Stub configuration for hackathon
        print("Firebase credentials not provided. Using stub firebase auth.")
