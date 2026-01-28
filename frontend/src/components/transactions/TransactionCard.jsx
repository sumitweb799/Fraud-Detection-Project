import React from 'react';
import { AlertTriangle, MapPin, Globe, CreditCard, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCurrency, formatDate, getFraudRiskLevel } from '../../utils/helpers';

const TransactionCard = ({ transaction }) => {
  const riskLevel = getFraudRiskLevel(transaction.fraudScore);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded">
              {transaction.transactionId}
            </span>
            <Badge status={transaction.status} />
            {transaction.alert && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> ALERT
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskLevel.bg} ${riskLevel.text}`}>
              {riskLevel.level} Risk
            </span>
          </div>

          {/* Transaction Flow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">From</p>
              <p className="font-semibold text-gray-800">{transaction.sender}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">To</p>
              <p className="font-semibold text-gray-800">{transaction.receiver}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <p className="text-gray-500 text-xs">Amount</p>
              </div>
              <p className="font-bold text-blue-600 text-lg">{formatCurrency(transaction.amount)}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                <p className="text-gray-500 text-xs">Fraud Score</p>
              </div>
              <p className={`font-bold text-lg ${
                transaction.fraudScore >= 65 ? 'text-red-600' : 'text-green-600'
              }`}>
                {transaction.fraudScore.toFixed(1)}%
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-gray-500 text-xs">Location</p>
              </div>
              <p className="font-semibold text-gray-800">{transaction.location}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-gray-400" />
                <p className="text-gray-500 text-xs">Channel</p>
              </div>
              <p className="font-semibold text-gray-800">{transaction.channel}</p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="mt-3 text-xs text-gray-500">
            {formatDate(transaction.timestamp)}
          </div>

          {/* Fraud Reasons */}
          {transaction.fraudReasons && transaction.fraudScore > 50 && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs font-semibold text-red-800 mb-1">Risk Factors:</p>
              <p className="text-xs text-red-700">{transaction.fraudReasons}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;