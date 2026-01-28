export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';
export const APP_NAME = process.env.REACT_APP_NAME || 'FraudShield';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';

export const TRANSACTION_STATUS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PROCESSING: 'PROCESSING',
  MANUAL_TEST: 'MANUAL_TEST'
};

export const CHANNELS = {
  ONLINE: 'ONLINE',
  ATM: 'ATM',
  MOBILE: 'MOBILE',
  WEB: 'WEB'
};

export const STATUS_COLORS = {
  SUCCESS: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-500',
    gradient: 'from-green-400 to-green-600'
  },
  FAILED: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-500',
    gradient: 'from-red-400 to-red-600'
  },
  PROCESSING: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-500',
    gradient: 'from-yellow-400 to-orange-500'
  },
  MANUAL_TEST: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-500',
    gradient: 'from-purple-500 to-pink-600'
  }
};

export const FRAUD_THRESHOLD = 65;

export const FRAUD_LEVELS = {
  LOW: { min: 0, max: 25, label: 'Low', color: 'green' },
  MEDIUM: { min: 25, max: 50, label: 'Medium', color: 'yellow' },
  HIGH: { min: 50, max: 75, label: 'High', color: 'orange' },
  CRITICAL: { min: 75, max: 100, label: 'Critical', color: 'red' }
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'TrendingUp' },
  { id: 'transactions', label: 'Transactions', icon: 'Activity' },
  { id: 'alerts', label: 'Fraud Alerts', icon: 'AlertTriangle' },
  { id: 'highrisk', label: 'High Risk', icon: 'Users' },
  { id: 'manual', label: 'Manual Test', icon: 'Send' }
];

export const TRANSACTION_TYPES = ['UPI', 'CARD', 'ATM'];

export const LOCATIONS = ['Kolkata', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Pune'];
