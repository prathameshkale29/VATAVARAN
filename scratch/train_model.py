import os
import json
import urllib.request
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.ensemble import RandomForestRegressor
import xgboost as xgb
import joblib

print("Starting Weather Model Training Pipeline...")

LATITUDE = 18.5204
LONGITUDE = 73.8567

end_date = datetime.today().date()
start_date = end_date - timedelta(days=730)

url = f"https://archive-api.open-meteo.com/v1/archive?latitude={LATITUDE}&longitude={LONGITUDE}&start_date={start_date}&end_date={end_date}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,rain_sum,wind_speed_10m_max,relative_humidity_2m_mean&timezone=auto"

print(f"Fetching weather observations ({start_date} to {end_date})...")
try:
    req = urllib.request.urlopen(url)
    data = json.loads(req.read().decode('utf-8'))
    df = pd.DataFrame(data['daily'])
    df['time'] = pd.to_datetime(df['time'])
    df.set_index('time', inplace=True)
    print(f"Fetched {len(df)} daily observations from Open-Meteo!")
except Exception as e:
    print(f"API fallback to synthetic series: {e}")
    dates = pd.date_range(start=start_date, end=end_date, freq='D')
    np.random.seed(42)
    n = len(dates)
    t_mean = 28 + 6 * np.sin(2 * np.pi * np.arange(n) / 365) + np.random.normal(0, 1.5, n)
    df = pd.DataFrame({
        'temperature_2m_max': t_mean + np.random.uniform(4, 8, n),
        'temperature_2m_min': t_mean - np.random.uniform(4, 8, n),
        'temperature_2m_mean': t_mean,
        'precipitation_sum': np.maximum(0, np.random.choice([0, 0, 0, 5, 20], size=n)),
        'wind_speed_10m_max': np.random.uniform(5, 25, n),
        'relative_humidity_2m_mean': np.clip(50 + np.random.normal(0, 10, n), 20, 95)
    }, index=dates)

# Feature Engineering
df_feat = df.copy()
df_feat['day_of_year'] = df_feat.index.dayofyear
df_feat['month'] = df_feat.index.month
df_feat['sin_day'] = np.sin(2 * np.pi * df_feat['day_of_year'] / 365.25)
df_feat['cos_day'] = np.cos(2 * np.pi * df_feat['day_of_year'] / 365.25)

for col in ['temperature_2m_mean', 'temperature_2m_max', 'precipitation_sum', 'relative_humidity_2m_mean']:
    for lag in [1, 2, 3, 7]:
        df_feat[f'{col}_lag_{lag}'] = df_feat[col].shift(lag)

for col in ['temperature_2m_mean', 'relative_humidity_2m_mean', 'precipitation_sum']:
    df_feat[f'{col}_roll_3_mean'] = df_feat[col].shift(1).rolling(window=3).mean()
    df_feat[f'{col}_roll_7_mean'] = df_feat[col].shift(1).rolling(window=7).mean()
    df_feat[f'{col}_roll_7_std'] = df_feat[col].shift(1).rolling(window=7).std()

df_feat['target_temp_mean_next_day'] = df_feat['temperature_2m_mean'].shift(-1)
df_cleaned = df_feat.dropna()

X = df_cleaned.drop(columns=['target_temp_mean_next_day'])
y = df_cleaned['target_temp_mean_next_day']

split_idx = int(len(X) * 0.8)
X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

print(f"Training set size: {len(X_train)} | Test set size: {len(X_test)}")

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
xgb_model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.05, max_depth=5, random_state=42)

rf_model.fit(X_train, y_train)
xgb_model.fit(X_train, y_train)

rf_preds = rf_model.predict(X_test)
xgb_preds = xgb_model.predict(X_test)

def eval_model(name, y_true, y_pred):
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    print(f"Metrics for {name}: RMSE={rmse:.3f}°C | MAE={mae:.3f}°C | R2={r2:.3f}")

eval_model("Random Forest", y_test, rf_preds)
eval_model("XGBoost", y_test, xgb_preds)

os.makedirs('models', exist_ok=True)
joblib.dump(xgb_model, 'models/weather_xgb_model.joblib')
joblib.dump(rf_model, 'models/weather_rf_model.joblib')
with open('models/feature_columns.json', 'w') as f:
    json.dump(list(X.columns), f)

print("Saved model checkpoints in ./models/ directory!")
