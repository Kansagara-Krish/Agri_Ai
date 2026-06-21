# AgriAI: Crop Yield Prediction System
### Semester 7 College Project

AgriAI is a modern, AI-powered agricultural intelligence platform designed to assist farmers with data-driven insights. This project was developed as a comprehensive Semester 7 College Project, focusing on predicting crop yields, providing intelligent fertilizer and crop recommendations, and detecting crop diseases using machine learning principles integrated into a full-stack architecture.

## Architecture

The project is split into two main components:
1. **Frontend (`/frontend`)**: A Next.js 14 web application built with React, Tailwind CSS, Framer Motion, and shadcn/ui. It provides a premium SaaS-like dashboard experience, complete with an interactive farmer profile, real-time weather integration, and empty-state onboarding.
2. **Backend (`/backend`)**: A highly optimized FastAPI (Python) backend using Pydantic for validation. It features endpoints for all ML prediction models, external API integrations (Open-Meteo for weather, SoilGrids for soil data), and an organized service-layer pattern.

## Core Features

- **Dashboard**: Real-time analytics, weather conditions, and risk scores.
- **Yield Prediction**: Machine learning-based estimations of harvest volumes depending on environmental parameters.
- **Disease Detection**: Image-based analysis to identify crop diseases and recommend treatments.
- **Recommendations**: Data-driven crop and fertilizer suggestions based on soil metrics (N, P, K, pH).
- **Premium Profile**: A fully interactive account management system with inline editable fields and global state synchronization.

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate  # On Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: FastAPI, Python, Pydantic, SQLAlchemy, Uvicorn
- **Database/Auth**: Supabase (PostgreSQL)

*Developed for Semester 7 College Project requirements.*
