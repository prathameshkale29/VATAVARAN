# GramMausam AI

Build a modern, professional, responsive web application for an AI-powered weather downscaling project called “GramMausam AI”.

PROJECT PURPOSE

The platform converts coarse block-level weather forecasts into high-resolution Panchayat-level weather forecasts using AI/ML.

The system combines:

Block-level Numerical Weather Prediction (NWP) forecasts

Historical weather observations

Satellite data

GIS/geospatial parameters

Elevation/DEM

Soil information

Land Use/Land Cover (LULC)

Other relevant environmental features

The goal is to provide localized weather information at Panchayat level.

The website should look like a real government/AgriTech climate intelligence platform, not like a generic student dashboard.

Use a clean, modern, trustworthy visual style with:

White/light background

Deep blue and green as the primary visual theme

Soft gradients

Rounded cards

Subtle shadows

Clean typography

Professional charts

Interactive maps

Responsive design for desktop, tablet and mobile

Smooth but subtle animations

Weather and GIS-inspired visual elements

Do not make the interface overcrowded.

WEBSITE STRUCTURE

Create the following pages:

Home / Landing Page

Interactive Weather Map

Panchayat Forecast

AI Downscaling

Historical Analysis

Data & Methodology

Weather Alerts

Admin / Model Dashboard

Add a fixed top navigation bar with:

GramMausam AI | Home | Weather Map | Forecast | AI Downscaling | Historical | Methodology | Alerts

Include a prominent CTA button:

Explore Weather Map

1. HOME / LANDING PAGE

Create a visually impressive landing page explaining the project.

Hero Section

Headline:

From Block-Level Forecasts to Panchayat-Level Weather Intelligence

Subtitle:

AI-powered spatial downscaling for localized weather forecasting using weather, satellite, GIS, soil, elevation and land-use data.

Buttons:

Explore Weather Map
How AI Works

Add a visual illustration showing:

Block-level forecast → AI Downscaling → Panchayat-level forecast

Example:

BLOCK FORECAST
32.5°C
↓
AI DOWNSCALING
↓
PANCHAYAT 1 — 31.8°C
PANCHAYAT 2 — 33.1°C
PANCHAYAT 3 — 32.4°C

Do not present these example values as real predictions.

Key Feature Cards

Create four cards:

🌍 High-Resolution Forecasting
Block-level weather converted into Panchayat-level information.

🤖 AI-Powered Downscaling
Machine learning/deep learning models learn spatial and temporal relationships.

🛰️ Multi-Source Data
Weather, satellite, GIS, soil, elevation and LULC data.

📍 Localized Intelligence
Forecast information available for individual Panchayats.

How It Works

Create a horizontal 5-step process:

Collect Data

Preprocess & Align

Feature Engineering

AI Downscaling

Panchayat Forecast

2. INTERACTIVE WEATHER MAP

This should be the main feature of the application.

Create a full-screen interactive GIS map.

Use a map library such as Leaflet or Mapbox.

Show:

District boundary

Block boundaries

Panchayat boundaries

Weather values

Map legend

Zoom controls

Search

Location selection

Left control panel

Create dropdowns:

District
Block
Panchayat
Date
Weather Variable

Weather Variable options:

Rainfall

Maximum Temperature

Minimum Temperature

Relative Humidity

Wind Speed

Map visualization

Allow users to switch between:

Rainfall Layer
Temperature Layer
Humidity Layer
Wind Layer

Use a clear legend.

Clicking a Panchayat should open a popup containing:

Panchayat Name
Block
District
Selected weather parameter
Forecast value
Forecast date

Add:

View Detailed Forecast →

Important

The map must be designed so that real Panchayat GeoJSON data can later be connected to it.

For now, create a clean demo/mock dataset and clearly structure the code so real API/database data can replace it later.

3. PANCHAYAT FORECAST

Create a detailed weather forecast page.

At the top:

Panchayat Weather Forecast

Provide selectors:

District → Block → Panchayat → Date

Display a summary card:

Panchayat Name
Block
District
Forecast Date

Then display weather cards:

🌧 Rainfall
XX mm

🌡 Maximum Temperature
XX °C

🌡 Minimum Temperature
XX °C

💧 Relative Humidity
XX %

💨 Wind Speed
XX km/h

Again, clearly label demo values as sample/mock data until the real model is connected.

Forecast Charts

Create:

7-Day Temperature Forecast

Line chart showing minimum and maximum temperature.

Rainfall Forecast

Bar chart.

Humidity Forecast

Line chart.

AI Prediction Information

Add a section:

AI Downscaled Forecast

Show:

Block-level input
↓
AI model
↓
Panchayat-level output

Include a confidence/uncertainty area, but do not invent scientific confidence values. If real uncertainty data is unavailable, display:

Uncertainty: Available after model calibration

4. AI DOWNSCALING PAGE

This page should explain the core technology behind the project.

Headline:

How AI Downscaling Works

Create an interactive pipeline:

Weather Forecast
+
Historical Weather
+
Satellite Data
+
Elevation
+
Soil
+
LULC
+
GIS Features

↓

Data Preprocessing

↓

Feature Engineering

↓

AI/ML Downscaling Model

↓

Panchayat-Level Forecast

Model Section

Create cards for:

Baseline Models

Linear Regression

Random Forest

XGBoost

Advanced Models

Neural Network

CNN

LSTM/Temporal Model

Transformer-based architecture

Do not claim that all models are implemented. Label them as:

Candidate / Experimental Models

Model Flow Visualization

Create an attractive diagram:

COARSE WEATHER INPUT
↓
SPATIAL FEATURES
+
TEMPORAL FEATURES
+
ENVIRONMENTAL FEATURES
↓
FEATURE FUSION
↓
AI MODEL
↓
HIGH-RESOLUTION WEATHER
↓
PANCHAYAT FORECAST

Explainability

Add a section called:

What Influences the Prediction?

Show example feature importance:

Elevation
Historical Temperature
Satellite Vegetation Index
Soil Properties
LULC
Nearby Weather Observations

Make it clear that these are example feature categories until actual model importance is calculated.

5. HISTORICAL ANALYSIS

Create a data analytics page.

Allow the user to select:

District
Block
Panchayat
Weather Variable
Date Range

Create charts for:

Historical Temperature

Actual vs AI Downscaled

Historical Rainfall

Daily/monthly rainfall

Seasonal Trends

Summer
Monsoon
Winter

Actual vs Predicted

Create a comparison chart.

Also create performance metric cards:

MAE
RMSE
R²

Do not insert fake performance numbers.

Display:

Awaiting trained model evaluation

until real evaluation results are connected.

Once the backend is connected, these cards should automatically display the real metrics.

6. DATA & METHODOLOGY

Create a visually attractive methodology page.

Data Sources

Create cards:

🌦 Weather Data
Historical observations and NWP forecasts

🛰 Satellite Data
Satellite-derived environmental information

⛰ Elevation
Digital Elevation Model

🌱 Soil
Soil characteristics

🌾 LULC
Land Use / Land Cover

🗺 GIS
Block and Panchayat boundaries

Data Pipeline

Show:

DATA SOURCES
↓
DATA INGESTION
↓
QUALITY CHECK
↓
SPATIAL ALIGNMENT
↓
TEMPORAL ALIGNMENT
↓
FEATURE ENGINEERING
↓
MODEL TRAINING
↓
VALIDATION
↓
PANCHAYAT FORECAST

Methodology

Explain:

Collect multi-source datasets.

Standardize spatial and temporal resolution.

Match weather data with Panchayat boundaries.

Generate spatial features.

Generate temporal features.

Train the downscaling model.

Validate against observed weather.

Generate Panchayat-level predictions.

Display predictions on the GIS map.

7. WEATHER ALERTS

Create an alert dashboard.

Top section:

Weather Alerts

Provide filters:

District
Block
Panchayat
Alert Type
Date

Alert categories:

🌧 Heavy Rainfall
🌡 High Temperature
🌬 Strong Wind
💧 High Humidity
⚠ Extreme Weather

Each alert card should show:

Alert Type
Panchayat
Expected parameter
Forecast period
Severity
Status

Example UI:

Heavy Rainfall Alert

Panchayat: Demo Panchayat
Expected rainfall: Sample value
Forecast period: Sample date
Status: Monitoring

Do not generate real-world warnings from fake data.

Include:

Alerts become operational only when connected to validated forecast data and defined thresholds.

8. ADMIN / MODEL DASHBOARD

Create an advanced dashboard intended for project demonstration.

Overview Cards

Total Panchayats
Data Records
Model Version
Last Data Update
Forecast Status

Data Pipeline Status

Show:

Weather Data — Connected / Pending
Satellite Data — Connected / Pending
GIS Data — Connected / Pending
Soil Data — Connected / Pending
LULC Data — Connected / Pending

Model Status

Model Name
Model Version
Training Date
Training Dataset
Validation Status

Model Performance

Display:

MAE
RMSE
R²

Use real backend values when available.

Prediction Monitor

Show:

Number of Panchayats predicted
Successful predictions
Missing data
Prediction timestamp

Admin Actions

Buttons:

Upload Dataset
Run Preprocessing
Train Model
Evaluate Model
Generate Forecast
Export Results

These buttons should initially be UI-only or connected to clearly defined API endpoints.

Do not pretend that model training is actually occurring unless a backend endpoint is connected.

BACKEND ARCHITECTURE

Structure the frontend so that it can connect to a future backend.

Recommended architecture:

Frontend:
React / Next.js

Backend:
FastAPI

AI/ML:
Python + Scikit-learn + XGBoost + PyTorch

Geospatial:
GeoPandas + Rasterio

Database:
PostgreSQL + PostGIS

Maps:
Leaflet / Mapbox

Charts:
Recharts / Plotly

API structure should be designed approximately as:

GET /api/weather
GET /api/panchayats
GET /api/blocks
GET /api/forecast
GET /api/historical
GET /api/model-performance
GET /api/alerts

POST /api/prediction
POST /api/upload
POST /api/train

Use mock JSON data initially, but organize the code so the mock API can later be replaced by FastAPI.

DATABASE CONCEPT

Design the application around entities such as:

District
Block
Panchayat
WeatherObservation
WeatherForecast
SatelliteFeature
GISFeature
SoilFeature
ElevationFeature
LULCFeature
Model
Prediction
Alert

Use IDs to connect:

District → Block → Panchayat → Weather Prediction

DESIGN REQUIREMENTS

Make the UI:

Modern

Professional

Scientific

Clean

Responsive

Accessible

Easy to demonstrate during a college/project presentation

Use consistent icons.

Use cards with subtle hover effects.

Use smooth transitions.

Use skeleton loading states.

Use empty states.

Use error states.

Use tooltips for technical terms.

Use breadcrumbs on deeper pages.

Do not overcrowd dashboards.

IMPORTANT DATA RULE

Never present placeholder values as actual weather predictions.

Whenever mock data is used, label it clearly as:

Demo Data

or

Sample Data

Keep all prediction values, model metrics and alert values configurable so they can later be replaced by the real AI model/API.

DEMO USER JOURNEY

The completed website should support this demonstration:

User opens Home.

User clicks Explore Weather Map.

User selects a District.

User selects a Block.

User sees Panchayat boundaries.

User selects a Panchayat.

Website displays the Panchayat forecast.

User opens AI Downscaling.

Website explains how block-level data is converted into Panchayat-level prediction.

User opens Historical Analysis.

User compares observed and predicted values.

User opens Model Dashboard.

User sees model metrics and data pipeline status.

The entire application should feel like one integrated platform rather than eight unrelated pages.

FINAL REQUIREMENT

Build the project with clean reusable components and a scalable folder structure.

Separate:

UI components

Pages

API services

Mock data

Types/interfaces

Map components

Chart components

Model dashboard components

Make the application functional with realistic mock data first.

Most importantly, make it easy to replace mock data with our actual AI weather-downscaling model and FastAPI backend later.

The final result should look like a polished AI + GIS + Weather Intelligence platform for Panchayat-level forecasting suitable for a hackathon, academic project demonstration, and future real-world deployment.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
