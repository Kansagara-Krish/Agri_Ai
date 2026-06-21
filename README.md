# 🌱 KhetSahyog (KissanSahyog) - AgriAI Platform

KhetSahyog is a premium, AI-powered agricultural intelligence platform designed to empower farmers and agricultural researchers with data-driven decision-making tools. Built using a modern tech stack, the platform integrates machine learning models, real-time external APIs, and a state-of-the-art responsive dashboard.

---

## 🚀 Key Features

*   **🧠 AI Crop Yield Prediction**: Predicts crop yield (`kg/ha`) and provides feature impact (SHAP value analysis) using random forest and XGBoost regressors based on input soil parameters, region, and weather data.
*   **🌱 Smart Crop Recommendation**: Recommends the top 3 optimal crops for a given soil composition (N, P, K, pH) and climate parameters.
*   **🧪 Fertilizer Recommendation**: Recommends the exact fertilizer type, dosage, and application schedule based on soil conditions and target crops.
*   **🍂 Disease Detection**: Upload crop leaves to identify diseases instantly and get tailored organic or chemical remedies.
*   **📅 Intelligent Irrigation Scheduling**: Generates a dynamic 7-day irrigation calendar based on soil moisture, weather forecasts, and crop growth stage.
*   **📊 Market Price Insights**: Displays current crop market prices, rates, and historical price trends across different Indian states and districts.
*   **🌦️ Live Weather Integration**: Real-time localized weather data fetched directly from the **Open-Meteo** API.
*   **🔬 Real-time Soil Profiling**: Fetches deep soil chemical and physical characteristics using GPS coordinates via the **SoilGrids** API.

---

## 🛠️ Architecture & Tech Stack

The application is structured as a decoupled monorepo:

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **State Management**: React Context API (`AuthContext`)
- **Key Features**: Glassmorphic layout, micro-animations, interactive map views, and responsive dashboard sections.

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Asynchronous Engine**: Async/Await router setup with Uvicorn
- **Validation**: Pydantic v2
- **External API Integrations**: `httpx` client for SoilGrids and Open-Meteo APIs
- **Security & Middleware**: Rate-limiting (SlowAPI), CORS (fully configured), and Firebase Admin SDK structure placeholder.

---

## 📂 Project Structure

```text
KissanSahyog/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application setup & middlewares
│   │   ├── core/                # Configuration & dependency injections
│   │   ├── db/                  # Database connections & models
│   │   ├── models/              # Saved ML models (e.g. scalers, label encoders)
│   │   ├── routers/             # API Endpoints (predict, recommend, detect, etc.)
│   │   ├── schemas/             # Pydantic response/request validation structures
│   │   └── services/            # Services layer containing live APIs & ML inference
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Production container definition
│
├── frontend/
│   ├── app/                     # Next.js App Router pages (login, dashboard, profile, etc.)
│   ├── context/                 # AuthContext & global state providers
│   ├── public/                  # Static assets and generated sprout graphics
│   ├── package.json             # NPM dependencies
│   └── tailwind.config.ts       # Tailwind CSS configuration
│
└── README.md                    # Main project documentation
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18.x or later)
- Python (v3.11 or later)

---

### 1. Setting Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on `.env.example` and fill in any required variables.
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   *The Swagger UI documentation will be available at `http://localhost:8000/docs`.*

---

### 2. Setting Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:3000` to view the application in your browser.*

---

## 🧬 Machine Learning & Data Sources

- **Crop Yield Predictor**: Scaled using standard scaler models and mapped using label encoders (`le_crop.pkl`, `le_state.pkl`, `le_dist.pkl`).
- **External Data**:
  - **Open-Meteo**: High-resolution meteorological data.
  - **SoilGrids**: Global digital soil information system.
