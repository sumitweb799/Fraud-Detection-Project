
# 🚨 Fraud Detection System

**Rule-Based + Machine Learning Powered Transaction Monitoring Platform**

---

## 📌 Project Overview

This project is a **full-stack Fraud Detection System** that simulates bank transactions, evaluates fraud risk using **rule-based logic combined with a Machine Learning model**, and provides a **real-time dashboard** for monitoring alerts, transactions, and analytics.

The system is designed to demonstrate:

* Transaction simulation
* Fraud detection logic
* ML model integration
* Secure authentication (JWT)
* Interactive dashboard with alerts and analytics

---

##  Key Features

### 🔐 Authentication

* User **Signup & Login**
* Password hashing using **BCrypt**
* JWT-based authentication

### 💳 Transaction Simulation

* Generate single or bulk transactions
* Automatic status assignment:

  * `SUCCESS`
  * `PROCESSING`
  * `FAILED`

### 🚨 Fraud Detection

* **Rule-based engine**

  * High transaction amount
  * Multiple failed attempts
  * Location/IP anomalies
  * Night-time activity
  * High-risk accounts
* **ML-based fraud prediction**

  * Supervised model trained in Python
  * Served via REST API
  * Combined score with rules engine

### 🔔 Fraud Alerts

* Live fraud alerts
* Unread alerts counter 
* Mark alerts as read
* Resolve fraud with notes
* Download transaction report as PDF

### 📊 Analytics Dashboard

* Fraud vs Normal transactions
* Status-based views
* Search by Transaction ID
* High-risk account management

---

##  System Architecture

```
┌──────────────────────────┐
│  React Frontend          │
│  (Dashboard UI)          │
└────────────┬─────────────┘
             │ HTTP / JWT
             ▼
┌──────────────────────────┐
│  Spring Boot Backend     │
│  - Rules Engine          │
│  - Auth & APIs           │
│  - DB (MySQL)            │
└────────────┬─────────────┘
             │ REST JSON
             ▼
┌──────────────────────────┐
│  Python ML Service       │
│  (FastAPI)               │
│  - fraud_model.pkl       │
│  - /predict API          │
└──────────────────────────┘
```

---

##  Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Data JPA
* MySQL
* JWT (JJWT)
* BCrypt Password Encoder

### Frontend

* React (JSX)
* Axios
* Recharts
* CSS (Custom Styling)

### Machine Learning

* Python
* Scikit-learn
* FastAPI
* Joblib
* Kaggle Dataset

---

## 📂 Project Structure

### Backend (Spring Boot)

```
Fraud-Detection/
├── controller/
├── service/
├── repository/
├── model/
├── config/
├── MyApplication.java
└── application.properties
```

### Frontend (React)

```
src/
├── api/
│   └── axios.js
├── components/
│   └── Navbar.js
├── pages/
│   ├── Login.js
│   ├── Signup.js
│   ├── Home.js
│   ├── GenerateTransaction.js
│   ├── AllTransactions.js
│   ├── FraudAlerts.js
│   ├── StatusTransactions.js
│   ├── SearchTransaction.js
│   ├── HighRiskAccounts.js
│   └── Analytics.js
├── styles/
│   ├── Auth.css
│   ├── Navbar.css
│   ├── Table.css
│   ├── Generate.css
│   ├── HighRisk.css
│   └── Home.css
├── App.js
└── index.js
```

### ML Service

```
ml_service/
├── app.py
├── fraud_model/
│   ├── fraud_model.pkl
│   ├── scaler.pkl
│   └── cat_columns.pkl
```

---

##  How to Run the Project

### 1️⃣ Backend (Spring Boot)

```bash
cd Fraud-Detection
mvn spring-boot:run
```

* Runs on: `http://localhost:9090`

---

### 2️⃣ ML Service (Python)

```bash
cd ml_service
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

* API: `POST http://localhost:8000/predict`

---

### 3️⃣ Frontend (React)

```bash
npm install
npm start
```

* Runs on: `http://localhost:3000`

---

## 🔗 Important API Endpoints

### Authentication

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Transactions

* `POST /api/transactions/generate`
* `POST /api/transactions/generate/{count}`
* `GET /api/transactions/all`
* `GET /api/transactions/status/{status}`

### Fraud

* `GET /api/fraud/alerts`
* `GET /api/fraud/alerts/unread-count`
* `PUT /api/fraud/alerts/mark-read`
* `GET /api/fraud/score/{id}`
* `GET /api/fraud/download/{id}`

---

## 🤖 Machine Learning Details

* **Model**: Logistic Regression (Supervised)
* **Training Dataset**: Kaggle Bank Transaction Dataset
* **Saved Artifacts**:

  * `fraud_model.pkl`
  * `scaler.pkl`
  * `cat_columns.pkl`
* **Integration**:

  * Spring Boot calls ML REST API
  * ML score combined with rule score

---

## 🧪 How to Test

1. Signup & login
2. Generate transactions
3. Observe fraud alerts
4. Check alert bell count
5. View analytics dashboard
6. Add high-risk accounts
7. Download fraud report PDF

---

## ⚠️ Limitations

* ML model trained on static dataset
* No real banking integration
* WebSocket alerts not implemented (polling used)

---

## 🌟 Future Enhancements

* Real-time alerts with WebSockets
* Admin roles
* Model retraining pipeline
* Docker deployment
* Cloud hosting (AWS / Azure)

---

## 👨‍💻 Author

**Debanjan Mondal**
B.Tech Final Year
Full-Stack & ML Enthusiast



