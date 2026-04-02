import httpx
from fastapi import HTTPException
from app.core.config import settings
from typing import Dict, Any

async def get_weather(lat: float, lon: float) -> Dict[str, Any]:
    url = f"{settings.open_meteo_api_url}?latitude={lat}&longitude={lon}&current_weather=true"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Open-Meteo current_weather format
            current = data.get("current_weather", {})
            return {
                "temperature": current.get("temperature", 0.0),
                "wind_speed": current.get("windspeed", 0.0),
                "humidity": 65.0, # not always in current_weather by default, using fallback
                "rainfall": 0.0,  # mock or extracted from detailed params
                "description": "Clear" # mock
            }
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Failed to fetch weather data: {str(e)}")
