from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np


# LOAD TRAINED MODEL & PREPROCESSING OBJECTS


MODEL_PATH = "fraud_model/fraud_model.pkl"
SCALER_PATH = "fraud_model/scaler.pkl"
CAT_COLUMNS_PATH = "fraud_model/cat_columns.pkl"

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
cat_columns = joblib.load(CAT_COLUMNS_PATH)


# FASTAPI APP


app = FastAPI(
    title="Fraud Detection ML Service",
    description="ML fraud prediction service",
    version="1.0"
)


# INPUT DATA SCHEMA (MUST MATCH TRAINING FEATURES)


class TransactionInput(BaseModel):
    TransactionAmount: float
    AccountBalance: float
    TransactionDuration: float
    LoginAttempts: int
    CustomerAge: int
    TimeGapSeconds: float
    Amount_to_Balance_Ratio: float
    TransactionType: str
    Location: str
    Channel: str


# PREDICTION ENDPOINT


@app.post("/predict")
def predict_fraud(tx: TransactionInput):

    # Convert incoming JSON to DataFrame
    df = pd.DataFrame([tx.dict()])

    # umerical features 
    numerical_features = [
        "TransactionAmount",
        "AccountBalance",
        "TransactionDuration",
        "LoginAttempts",
        "CustomerAge",
        "TimeGapSeconds",
        "Amount_to_Balance_Ratio"
    ]

    X_num = scaler.transform(df[numerical_features])

    # Categorical features 
    categorical_features = ["TransactionType", "Location", "Channel"]
    X_cat = pd.get_dummies(df[categorical_features])

    # Align with training columns
    X_cat = X_cat.reindex(columns=cat_columns, fill_value=0)

    # Final feature matrix 
    X_final = np.hstack([X_num, X_cat.values])

    #  ML Prediction 
    fraud_probability = model.predict_proba(X_final)[0][1]

    return {
        "fraud_probability": round(float(fraud_probability), 4),
        "fraud_prediction": int(fraud_probability >= 0.65)
    }
