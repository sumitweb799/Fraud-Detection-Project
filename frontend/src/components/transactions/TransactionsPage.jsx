import React, { useState } from 'react';
import { Plus, RefreshCw, Download, Package } from 'lucide-react';
import TransactionCard from './TransactionCard';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import { transactionService } from '../../services/transactionService';
import Button from '../common/Button';
import PageHeader from '../layout/PageHeader';
import EmptyState from '../common/EmptyState';

const TransactionsPage = ({ transactions, onRefresh }) => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [generating, setGenerating] = useState(false);

  // 🔔 Alert Bell refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'ALL' || t.status === filter;
    const searchLower = search.toLowerCase();
    return (
      matchesFilter &&
      (
        t.transactionId.toLowerCase().includes(searchLower) ||
        t.sender.toLowerCase().includes(searchLower) ||
        t.receiver.toLowerCase().includes(searchLower)
      )
    );
  });

  // ✅ SAME PATTERN AS DASHBOARD
  const generateTransactions = async (count) => {
    setGenerating(true);
    try {
      await transactionService.generate(count);
      await onRefresh();

      // 🔔 update alert bell count after refresh/generate
      setRefreshTrigger(prev => prev + 1);

    } catch (err) {
      console.error('Error generating transactions:', err);
      alert('Failed to generate transactions');
    } finally {
      setGenerating(false);
    }
  };

  const downloadTransactions = () => {
    const headers = [
      'Transaction ID',
      'Timestamp',
      'Sender',
      'Receiver',
      'Amount',
      'Status',
      'Fraud Score',
      'Channel',
      'Location'
    ];

    const csvData = filteredTransactions.map(t => [
      t.transactionId,
      t.timestamp,
      t.sender,
      t.receiver,
      t.amount,
      t.status,
      t.fraudScore,
      t.channel,
      t.location
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actions = (
    <>
      <Button
        onClick={downloadTransactions}
        disabled={filteredTransactions.length === 0}
        icon={Download}
        size="md"
        variant="success"
      >
        Download CSV
      </Button>

      <Button
        onClick={() => generateTransactions(1)}
        disabled={generating}
        icon={Plus}
        size="md"
        variant="primary"
      >
        {generating ? 'Generating...' : 'Generate 1'}
      </Button>

      <Button
        onClick={() => generateTransactions(5)}
        disabled={generating}
        icon={Plus}
        size="md"
        className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg"
      >
        {generating ? 'Generating...' : 'Generate 5'}
      </Button>

      {/* 🔁 REFRESH (also updates alert bell) */}
      <Button
        onClick={() => generateTransactions(10)}
        disabled={generating}
        icon={RefreshCw}
        size="md"
        variant="outline"
      >
        {generating ? 'Generating...' : 'Refresh'}
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        subtitle="Manage and monitor all financial transactions"
        gradient="from-blue-600 to-cyan-600"
        actions={actions}
        refreshTrigger={refreshTrigger}   // 🔔 PASS TO ALERT BELL
      />

      <TransactionFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        count={filteredTransactions.length}
      />

      {filteredTransactions.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Transactions Found"
          message={
            search || filter !== 'ALL'
              ? 'Try adjusting your filters or search terms'
              : 'Generate transactions to get started'
          }
          action={() => generateTransactions(5)}
          actionLabel="Generate Transactions"
        />
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTransactions.map(t => (
            <TransactionCard key={t.transactionId} transaction={t} />
          ))}
        </div>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default TransactionsPage;
