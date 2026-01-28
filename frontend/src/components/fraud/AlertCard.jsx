import React, { useState } from 'react';
import { AlertTriangle, Download, MapPin, Globe, CreditCard, Clock, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { fraudService } from '../../services/fraudService';

const AlertCard = ({ alert, onResolve }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await fraudService.downloadPdf(alert.transactionId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transaction_${alert.transactionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 rounded-2xl p-6 border-2 border-red-200 shadow-lg hover:shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">High Fraud Risk Detected</h3>
            <p className="text-sm text-gray-600 font-mono">{alert.transactionId}</p>
          </div>
        </div>
        <div className="text-right bg-white rounded-xl p-4 shadow-md">
          <p className="text-4xl font-bold text-red-600 mb-1">{alert.fraudScore.toFixed(1)}%</p>
          <p className="text-sm text-gray-600 font-medium">Risk Score</p>
        </div>
      </div>

      {/* Transaction Flow */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500 mb-1">From</p>
            <p className="font-bold text-gray-800 text-lg">{alert.sender}</p>
          </div>
          <ArrowRight className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div className="flex-1 bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500 mb-1">To</p>
            <p className="font-bold text-gray-800 text-lg">{alert.receiver}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-red-500" />
            <p className="text-xs text-gray-500">Amount</p>
          </div>
          <p className="font-bold text-red-600 text-xl">{formatCurrency(alert.amount)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-500">Location</p>
          </div>
          <p className="font-semibold text-gray-800">{alert.location}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-500">IP Address</p>
          </div>
          <p className="font-semibold text-gray-800 font-mono text-sm">{alert.ipAddress}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-500">Channel</p>
          </div>
          <p className="font-semibold text-gray-800">{alert.channel}</p>
        </div>
      </div>

      {/* Fraud Indicators */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-md border-l-4 border-red-500">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fraud Indicators:</p>
            <p className="text-sm text-gray-600 leading-relaxed">{alert.fraudReasons}</p>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-xs text-gray-500 mb-4">
        <Clock className="w-3 h-3 inline mr-1" />
        Detected at: {formatDate(alert.timestamp)}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => onResolve(alert)}
          variant="success"
          className="flex-1"
          size="lg"
        >
          Resolve Alert
        </Button>
        <Button
          onClick={handleDownload}
          disabled={downloading}
          icon={Download}
          className="bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {downloading ? 'Downloading...' : 'PDF Report'}
        </Button>
      </div>
    </div>
  );
};

export default AlertCard;
