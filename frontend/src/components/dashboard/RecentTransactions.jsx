import React from 'react';
import { ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import { truncateId, formatCurrency, formatDateShort } from '../../utils/helpers';

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 8);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
        <button className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      {recentTransactions.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No transactions yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">ID</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Time</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Fraud Score</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr 
                  key={t.transactionId} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-gray-800 font-mono">
                    {truncateId(t.transactionId)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDateShort(t.timestamp)}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge status={t.status} />
                  </td>
                  <td className="py-3 px-4">
                    <span className={`
                      text-sm font-bold
                      ${t.fraudScore >= 75 ? 'text-red-600' :
                        t.fraudScore >= 50 ? 'text-orange-600' :
                        t.fraudScore >= 25 ? 'text-yellow-600' :
                        'text-green-600'}
                    `}>
                      {t.fraudScore.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;