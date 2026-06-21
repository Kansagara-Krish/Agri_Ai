You are an expert Python backend developer. Build a clean, well-structured FastAPI backend for an AgriAI crop yield prediction system (Semester 7 College Project). 

## CRITICAL RULE
DO NOT implement any ML model, load any .pkl file, or write any prediction logic.
Every prediction endpoint must return clean hardcoded stub/mock responses.
The code structure must make it trivially easy to plug in real models later by replacing ONLY the stub functions inside a /services/ layer.

## Tech Stack
- FastAPI (Python 3.11+)
- Uvicorn (ASGI server)
- Pydantic v2 (request/response validation)
- SQLAlchemy (async) + Supabase/PostgreSQL (schema-ready, migrations not required)
- Firebase Admin SDK (token verification middleware — structure only)
- httpx (for calling external APIs)
- python-dotenv (.env for all secrets)
- CORS middleware (allow all origins for Semester 7 College Project)

## Project Structure
backend/
  app/
    main.py                    # FastAPI app init, middleware, router registration
    core/
      config.py                # All env vars via pydantic BaseSettings
      dependencies.py          # Shared FastAPI dependencies (get_db, verify_token)
      firebase.py              # Firebase Admin SDK init (stub if no credentials)
    routers/
      predict.py               # /api/predict/* routes
      recommend.py             # /api/recommend/* routes
      detect.py                # /api/detect/* routes
      schedule.py              # /api/schedule/* routes
      market.py                # /api/market/* routes
      weather.py               # /api/weather route
      admin.py                 # /api/admin/* routes
    schemas/
      predict.py               # Pydantic input/output models for predictions
      recommend.py             # Pydantic models for recommendations
      detect.py                # Pydantic models for disease detection
      schedule.py              # Pydantic models for irrigation
      market.py                # Pydantic models for market prices
      common.py                # Shared response schemas (BaseResponse, ErrorResponse)
    services/
      yield_service.py         # STUB: predict_yield(input) → mock response
      crop_service.py          # STUB: recommend_crop(input) → mock response
      fertilizer_service.py    # STUB: recommend_fertilizer(input) → mock response
      disease_service.py       # STUB: detect_disease(image, crop_type) → mock response
      irrigation_service.py    # STUB: schedule_irrigation(input) → mock response
      market_service.py        # STUB: fetch_market_prices(crop, state) → calls Agmarknet or mock
      weather_service.py       # REAL: calls Open-Meteo API (free, no key) by lat/lon
      soil_service.py          # REAL: calls SoilGrids REST API by lat/lon
    db/
      database.py              # SQLAlchemy async engine + session factory
      models.py                # EMPTY FILE — placeholder comment only: "# Add DB models here"
  .env.example
  requirements.txt
  Dockerfile
  README.md

## API Endpoints to Build

### Prediction
POST /api/predict/yield
  Input: { N, P, K, pH, temperature, humidity, rainfall, solar_radiation, state, district, season, crop_type }
  Output: { predicted_yield: 3200, unit: "kg/ha", risk_score: 0.72, shap_values: { N: 0.3, P: 0.2, Rainfall: 0.25, Temperature: 0.15, K: 0.1 } }
  → calls yield_service.predict_yield() [STUB]

### Recommendations
POST /api/recommend/crop
  Input: { N, P, K, pH, temperature, humidity, rainfall }
  Output: { recommendations: [{ crop: str, confidence: float }] }  (top 3)
  → calls crop_service.recommend_crop() [STUB]

POST /api/recommend/fertilizer
  Input: { soil_type, crop_type, N_current, P_current, K_current, temperature, humidity, moisture }
  Output: { fertilizer: str, dosage: str, notes: str }
  → calls fertilizer_service.recommend_fertilizer() [STUB]

### Disease Detection
POST /api/detect/disease
  Input: multipart/form-data → image file + crop_type field
  Output: { disease: str, confidence: float, remedy: str }
  → calls disease_service.detect_disease() [STUB — just return mock, image accepted but not processed]

### Irrigation
POST /api/schedule/irrigation
  Input: { temperature, humidity, wind_speed, solar_radiation, soil_moisture, rainfall, crop_stage }
  Output: { schedule: [{ day: str, irrigate: bool, amount_mm: float }] } (7-day list)
  → calls irrigation_service.schedule_irrigation() [STUB]

### Market
GET /api/market/prices?crop=wheat&state=gujarat
  Output: { crop: str, price_per_quintal: float, trend: [{ date: str, price: float }] }
  → calls market_service.fetch_market_prices() [STUB with realistic dummy data]

### Weather (REAL — call Open-Meteo)
GET /api/weather?lat=23.03&lon=72.58
  Output: { temperature: float, humidity: float, rainfall: float, wind_speed: float, description: str }
  → calls weather_service.get_weather(lat, lon) using httpx → Open-Meteo free API

### Soil (REAL — call SoilGrids)
GET /api/soil?lat=23.03&lon=72.58
  Output: { N: float, P: float, K: float, pH: float, moisture: float }
  → calls soil_service.get_soil_data(lat, lon) using httpx → SoilGrids REST API

### Admin
GET /api/admin/logs        → returns list of last 50 prediction log entries (mock list)
POST /api/admin/alert      → body: { message: str, district: str } → returns { status: "sent" }

### Health
GET /api/health → { status: "ok", version: "1.0.0" }

## Stub Service Rules
Each stub service function must:
1. Accept proper typed parameters
2. Have a clear TODO comment: # TODO: Replace with real model call
3. Return the exact same Pydantic response schema that the real model will return
4. Use realistic hardcoded values (not zeros or empty strings)

## Additional Requirements
- All routes use async def
- Global exception handler returning { error: str, status_code: int }
- Request logging middleware (log method + path + response time)
- Rate limiting via slowapi (100 req/min per IP)
- Full CORS enabled for Semester 7 College Project
- requirements.txt with pinned versions
- Dockerfile with multi-stage build
- .env.example with all required variables listed
- /docs (Swagger UI) must be fully functional and show all endpoints