from app.schemas.recommend import CropRecommendationInput, CropRecommendationOutput, CropRecommendationItem

async def recommend_crop(input_data: CropRecommendationInput) -> CropRecommendationOutput:
    # TODO: Replace with real model call
    return CropRecommendationOutput(
        recommendations=[
            CropRecommendationItem(crop="Wheat", confidence=0.85),
            CropRecommendationItem(crop="Rice", confidence=0.10),
            CropRecommendationItem(crop="Maize", confidence=0.05),
        ]
    )
