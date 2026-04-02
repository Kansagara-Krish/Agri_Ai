from app.schemas.predict import YieldPredictionInput, YieldPredictionOutput

async def predict_yield(input_data: YieldPredictionInput) -> YieldPredictionOutput:
    # TODO: Replace with real model call
    return YieldPredictionOutput(
        predicted_yield=3200.5,
        unit="kg/ha",
        risk_score=0.72,
        shap_values={
            "N": 0.3,
            "P": 0.2,
            "Rainfall": 0.25,
            "Temperature": 0.15,
            "K": 0.1
        }
    )
