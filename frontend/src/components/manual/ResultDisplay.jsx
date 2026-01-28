import React from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { formatCurrency, getFraudRiskLevel } from '../../utils/helpers';
import Badge from '../common/Badge';

const ResultDisplay = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Analysis Result</h3>
        <div className="text-center py-16">
          <Activity className="w-20 h-20 text-gray-300 mx-auto mb-6 animate-pulse" />
          <p className="text-gray-500 text-lg mb-2">Waiting for Analysis</p>
          <p className="text-gray-400 text-sm">Submit a transaction to see fraud detection results</p>
        </div>
      </div>
    );
  }

  const riskLevel = getFraudRiskLevel(result.fraudScore);
  const isHighRisk = result.fraudScore >= 65;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Analysis Result</h3>
      
      <div className="space-y-6">
        {/* Risk Score Display */}
        <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
          <div className={`
            inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 shadow-lg
            ${isHighRisk ? 'bg-red-100' : 'bg-green-100'}
          `}>
            {isHighRisk ? (
              <AlertTriangle className="w-16 h-16 text-red-600" />
            ) : (
              <CheckCircle className="w-16 h-16 text-green-600" />
            )}
          </div>
          
          <div className={`
            text-6xl font-bold mb-2
            ${isHighRisk ? 'text-red-600' : 'text-green-600'}
          `}>
            {result.fraudScore.toFixed(0)}%
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className={`w-5 h-5 ${isHighRisk ? 'text-red-600' : 'text-green-600'}`} />
            <p className="text-2xl font-bold text-gray-800">
              {isHighRisk ? 'High Risk' : 'Low Risk'}
            </p>
          </div>
          
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${riskLevel.bg} ${riskLevel.text}`}>
            {riskLevel.level} Risk Level
          </span>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
            <p className="font-mono text-sm text-gray-800">{result.transactionId}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Transaction Amount</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(result.amount)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <Badge status={result.status} />
          </div>

          <div className={`rounded-lg p-4 ${isHighRisk ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${isHighRisk ? 'text-red-600' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm font-semibold mb-2 ${isHighRisk ? 'text-red-800' : 'text-green-800'}`}>
                  {isHighRisk ? 'Risk Indicators:' : 'Analysis Summary:'}
                </p>
                <p className={`text-sm leading-relaxed ${isHighRisk ? 'text-red-700' : 'text-green-700'}`}>
                  {result.fraudReasons}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;