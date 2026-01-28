import React from 'react';
import { Trash2, AlertTriangle, User } from 'lucide-react';
import Button from '../common/Button';

const AccountCard = ({ account, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove ${account.accountNumber} from the watchlist?`)) {
      onRemove(account.accountNumber);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Number</p>
            <p className="text-xl font-bold text-gray-800">{account.accountNumber}</p>
          </div>
        </div>
        <Button
          onClick={handleRemove}
          variant="danger"
          size="sm"
          icon={Trash2}
        />
      </div>

      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-start gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 font-semibold">Reason for Flagging:</p>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">{account.reason}</p>
      </div>
    </div>
  );
};

export default AccountCard;