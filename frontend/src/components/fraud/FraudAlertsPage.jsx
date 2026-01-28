import React, { useState } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import AlertCard from './AlertCard';
import ResolutionModal from './ResolutionModal';
import { fraudService } from '../../services/fraudService';
import PageHeader from '../layout/PageHeader';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';

const FraudAlertsPage = ({ alerts, onRefresh }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [resolving, setResolving] = useState(false);

  const handleResolve = async (id, note) => {
    setResolving(true);
    try {
      await fraudService.resolve(id, note);
      await onRefresh();
    } catch (err) {
      console.error('Error resolving alert:', err);
      throw err;
    } finally {
      setResolving(false);
    }
  };

  const actions = (
    <>
      <Button
        onClick={onRefresh}
        icon={RefreshCw}
        variant="outline"
      >
        Refresh
      </Button>
      <div className="text-2xl font-bold text-red-600">
        {alerts.length} Active
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fraud Alerts"
        subtitle="Monitor and resolve high-risk transactions"
        gradient="from-red-600 to-orange-600"
        actions={actions}
      />

      {alerts.length === 0 ? (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
          <EmptyState
            icon={Shield}
            title="All Clear!"
            message="No active fraud alerts at the moment. The system is monitoring all transactions."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.transactionId}
              alert={alert}
              onResolve={setSelectedAlert}
            />
          ))}
        </div>
      )}

      {selectedAlert && (
        <ResolutionModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onConfirm={handleResolve}
          loading={resolving}
        />
      )}
    </div>
  );
};

export default FraudAlertsPage;
