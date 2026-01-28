import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import Button from '../common/Button';
import Alert from '../common/Alert';

const ResolutionModal = ({ alert, onClose, onConfirm, loading }) => {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!note.trim()) {
      setError('Please enter a resolution note');
      return;
    }

    if (note.trim().length < 10) {
      setError('Resolution note must be at least 10 characters');
      return;
    }

    try {
      await onConfirm(alert.transactionId, note);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to resolve alert');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Resolve Fraud Alert</h3>
              <p className="text-sm text-gray-600">Transaction: {alert.transactionId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Alert Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Amount</p>
              <p className="font-bold text-gray-800">₹{alert.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Fraud Score</p>
              <p className="font-bold text-red-600">{alert.fraudScore.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
            className="mb-4"
          />
        )}

        {/* Resolution Note */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution Notes <span className="text-red-500">*</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter detailed resolution notes (minimum 10 characters)..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-2">
            {note.length} characters {note.length < 10 ? `(${10 - note.length} more required)` : ''}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={loading || note.trim().length < 10}
            variant="success"
            className="flex-1"
            size="lg"
          >
            {loading ? 'Resolving...' : 'Confirm Resolution'}
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={loading}
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResolutionModal;