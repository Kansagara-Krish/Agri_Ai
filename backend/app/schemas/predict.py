from pydantic import BaseModel, ConfigDict
from typing import Dict

class YieldPredictionInput(BaseModel):
    model_config = ConfigDict(strict=True)

    N: float
    P: float
    K: float
    pH: float
    temperature: float
    humidity: float
    rainfall: float
    solar_radiation: float
    state: str
    district: str
    season: str
    crop_type: str

class YieldPredictionOutput(BaseModel):
    predicted_yield: float
    unit: str
    risk_score: float
    shap_values: Dict[str, float]
