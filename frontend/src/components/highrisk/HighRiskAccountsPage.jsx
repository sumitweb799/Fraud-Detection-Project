import React, { useState } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import AccountCard from './AccountCard';
import AddAccountForm from './AddAccountForm';
import { useHighRiskAccounts } from '../../hooks/useHighRiskAccounts';
import PageHeader from '../layout/PageHeader';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import Loading from '../common/Loading';

const HighRiskAccountsPage = () => {
  const { accounts, loading, refresh, addAccount, removeAccount } = useHighRiskAccounts();

  if (loading) {
    return <Loading fullScreen message="Loading high-risk accounts..." />;
  }

  const actions = (
    <Button onClick={refresh} icon={RefreshCw} variant="outline">
      Refresh
    </Button>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="High Risk Accounts"
        subtitle="Manage and monitor accounts flagged as high-risk"
        gradient="from-orange-600 to-red-600"
        actions={actions}
      />

      <AddAccountForm onAdd={addAccount} />

      {accounts.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl border-2 border-gray-200">
          <EmptyState
            icon={Users}
            title="No High-Risk Accounts"
            message="The watchlist is empty. Add accounts that require monitoring."
          />
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
            <p className="text-sm text-orange-800">
              <strong>{accounts.length}</strong> account{accounts.length !== 1 ? 's' : ''} currently on the watchlist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <AccountCard
                key={account.accountNumber}
                account={account}
                onRemove={removeAccount}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HighRiskAccountsPage;
