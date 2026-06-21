from app.schemas.recommend import FertilizerRecommendationInput, FertilizerRecommendationOutput


async def recommend_fertilizer(input_data: FertilizerRecommendationInput) -> FertilizerRecommendationOutput:
    """
    Stubbed fertilizer recommendation.
    This avoids loading any ML models and returns a deterministic recommendation
    based on simple rules so the endpoint works in dev without heavy deps.
    """

    # Simple rule-based heuristic (stub)
    N = input_data.N or 0
    P = input_data.P or 0
    K = input_data.K or 0

    if N < 40:
        fertilizer = "Urea (Nitrogen-rich)"
        dosage = "50 kg/ha"
        notes = "Soil shows low nitrogen; apply N-rich fertilizer and re-test in 30 days."
    elif P < 30:
        fertilizer = "DAP (Phosphorus-rich)"
        dosage = "100 kg/ha"
        notes = "Soil phosphorus is low; apply phosphorus-rich fertilizer per crop needs."
    elif K < 40:
        fertilizer = "Muriate of Potash (Potassium-rich)"
        dosage = "40 kg/ha"
        notes = "Soil potassium is low; apply K fertilizer and monitor crop response."
    else:
        fertilizer = "Balanced NPK (e.g., 10-26-26)"
        dosage = "75 kg/ha"
        notes = "Soil nutrients are adequate; apply a balanced fertilizer as maintenance."

    return FertilizerRecommendationOutput(
        fertilizer=fertilizer,
        dosage=dosage,
        notes=notes,
    )
