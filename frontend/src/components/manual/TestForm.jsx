import React from 'react';
import { Send, Zap } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const TestForm = ({ formData, setFormData, onSubmit, submitting }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormValid = () => {
    return formData.sender && formData.receiver && formData.amount &&
           formData.location && formData.ipAddress;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Test Transaction</h3>
          <p className="text-sm text-gray-600">Enter transaction details for fraud analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Sender Account"
            value={formData.sender}
            onChange={(e) => handleChange('sender', e.target.value)}
            placeholder="ACC1001"
            required
            disabled={submitting}
          />
          <Input
            label="Receiver Account"
            value={formData.receiver}
            onChange={(e) => handleChange('receiver', e.target.value)}
            placeholder="ACC1002"
            required
            disabled={submitting}
          />
        </div>

        <Input
          label="Transaction Amount (₹)"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          placeholder="1000.00"
          required
          disabled={submitting}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.channel}
              onChange={(e) => handleChange('channel', e.target.value)}
              disabled={submitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="ONLINE">Online Banking</option>
              <option value="ATM">ATM</option>
              <option value="MOBILE">Mobile App</option>
              <option value="WEB">Web Portal</option>
            </select>
          </div>
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Mumbai"
            required
            disabled={submitting}
          />
        </div>

        <Input
          label="IP Address"
          value={formData.ipAddress}
          onChange={(e) => handleChange('ipAddress', e.target.value)}
          placeholder="192.168.1.1"
          required
          disabled={submitting}
        />

        <Button
          onClick={onSubmit}
          disabled={submitting || !isFormValid()}
          icon={Send}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="lg"
        >
          {submitting ? 'Analyzing...' : 'Run Fraud Analysis'}
        </Button>
      </div>
    </div>
  );
};

export default TestForm;
