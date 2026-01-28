import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const FraudStats = ({ alerts, transactions }) => {
  const totalFraudAmount = alerts.reduce((sum, alert) => sum + alert.amount, 0);
  const avgFraudScore = alerts.length > 0
    ? alerts.reduce((sum, alert) => sum + alert.fraudScore, 0) / alerts.length
    : 0;
  const criticalAlerts = alerts.filter(a => a.fraudScore >= 75).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Total Fraud Amount</h4>
          <TrendingUp className="w-5 h-5 text-red-600" />
        </div>
        <p className="text-3xl font-bold text-red-600">₹{totalFraudAmount.toLocaleString()}</p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Avg. Fraud Score</h4>
          <TrendingDown className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-3xl font-bold text-orange-600">{avgFraudScore.toFixed(1)}%</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Critical Alerts</h4>
          <AlertCircle className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-purple-600">{criticalAlerts}</p>
      </div>
    </div>
  );
};

export default FraudStats;