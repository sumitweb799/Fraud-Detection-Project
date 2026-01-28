import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCurrency, formatDate, truncateId } from '../../utils/helpers';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <tr>
              <th className="text-left py-4 px-4 font-semibold">ID</th>
              <th className="text-left py-4 px-4 font-semibold">Timestamp</th>
              <th className="text-left py-4 px-4 font-semibold">From → To</th>
              <th className="text-right py-4 px-4 font-semibold">Amount</th>
              <th className="text-center py-4 px-4 font-semibold">Status</th>
              <th className="text-center py-4 px-4 font-semibold">Fraud Score</th>
              <th className="text-center py-4 px-4 font-semibold">Channel</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr
                key={t.transactionId}
                className={`
                  border-b border-gray-100 hover:bg-blue-50 transition
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
              >
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-gray-800">
                    {truncateId(t.transactionId)}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {formatDate(t.timestamp)}
                </td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-medium">{t.sender}</span>
                    <span className="text-gray-500 text-xs">→ {t.receiver}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-bold text-blue-600">
                  {formatCurrency(t.amount)}
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge status={t.status} />
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`
                      font-bold
                      ${t.fraudScore >= 75 ? 'text-red-600' :
                        t.fraudScore >= 50 ? 'text-orange-600' :
                        t.fraudScore >= 25 ? 'text-yellow-600' :
                        'text-green-600'}
                    `}>
                      {t.fraudScore.toFixed(1)}%
                    </span>
                    {t.alert && <AlertTriangle className="w-4 h-4 text-red-600" />}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {t.channel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;