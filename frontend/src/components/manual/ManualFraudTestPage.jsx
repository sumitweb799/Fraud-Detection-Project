import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import TestForm from './TestForm';
import ResultDisplay from './ResultDisplay';
import { fraudService } from '../../services/fraudService';
import PageHeader from '../layout/PageHeader';
import Button from '../common/Button';

const ManualFraudTestPage = () => {
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    amount: '',
    channel: 'ONLINE',
    location: '',
    ipAddress: '',
    status: 'MANUAL_TEST'
  });
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const data = await fraudService.manualTest({
        ...formData,
        amount: parseFloat(formData.amount),
        timestamp: new Date().toISOString()
      });
      setResult(data);
    } catch (err) {
      console.error('Error testing transaction:', err);
      alert('Failed to test transaction: ' + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      sender: '',
      receiver: '',
      amount: '',
      channel: 'ONLINE',
      location: '',
      ipAddress: '',
      status: 'MANUAL_TEST'
    });
    setResult(null);
  };

  const actions = (
    <Button onClick={handleReset} icon={RefreshCw} variant="outline">
      Reset Form
    </Button>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manual Fraud Test"
        subtitle="Test fraud detection with custom transaction data"
        gradient="from-purple-600 to-pink-600"
        actions={actions}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TestForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
        <ResultDisplay result={result} />
      </div>
    </div>
  );
};

export default ManualFraudTestPage;
