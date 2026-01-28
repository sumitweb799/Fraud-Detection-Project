import React, { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Alert from '../common/Alert';

const AddAccountForm = ({ onAdd }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!accountNumber.trim() || !reason.trim()) {
      setError('Please fill all fields');
      return;
    }

    if (accountNumber.trim().length < 3) {
      setError('Account number must be at least 3 characters');
      return;
    }

    if (reason.trim().length < 10) {
      setError('Reason must be at least 10 characters');
      return;
    }

    setSubmitting(true);
    try {
      await onAdd(accountNumber.trim(), reason.trim());
      setAccountNumber('');
      setReason('');
      setSuccess('Account added to watchlist successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Add High Risk Account</h3>
          <p className="text-sm text-gray-600">Flag an account for monitoring</p>
        </div>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
      )}

      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess('')} className="mb-4" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          label="Account Number"
          placeholder="e.g., ACC1001"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          disabled={submitting}
          required
        />
        <Input
          label="Reason for Flagging"
          placeholder="e.g., Suspicious activity detected"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={submitting}
          required
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={submitting}
        icon={Plus}
        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        size="lg"
      >
        {submitting ? 'Adding to Watchlist...' : 'Add to Watchlist'}
      </Button>
    </div>
  );
};

export default AddAccountForm;