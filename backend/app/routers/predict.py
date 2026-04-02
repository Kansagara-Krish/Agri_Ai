from fastapi import APIRouter, Depends
from app.schemas.predict import YieldPredictionInput, YieldPredictionOutput
from app.services import yield_service

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/yield", response_model=YieldPredictionOutput)
async def predict_yield_endpoint(input_data: YieldPredictionInput):
    return await yield_service.predict_yield(input_data)
