from fastapi import UploadFile
from app.schemas.detect import DiseaseDetectionOutput

async def detect_disease(image: UploadFile, crop_type: str) -> DiseaseDetectionOutput:
    # TODO: Replace with real model call.
    # We accept the image but don't process it, just return mock.
    return DiseaseDetectionOutput(
        disease="Leaf Rust",
        confidence=0.92,
        remedy="Apply propiconazole 25% EC at 1 ml/liter of water."
    )
