from fastapi import APIRouter, Depends, Query
from app.services import weather_service, soil_service

router_weather = APIRouter(prefix="/weather", tags=["Weather"])
router_soil = APIRouter(prefix="/soil", tags=["Soil"])

@router_weather.get("")
async def get_weather_endpoint(
    lat: float = Query(...), 
    lon: float = Query(...)
):
    return await weather_service.get_weather(lat, lon)

@router_soil.get("")
async def get_soil_endpoint(
    lat: float = Query(...), 
    lon: float = Query(...)
):
    return await soil_service.get_soil_data(lat, lon)
