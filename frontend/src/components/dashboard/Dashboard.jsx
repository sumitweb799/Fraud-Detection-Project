import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, Plus, RefreshCw } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import RecentTransactions from './RecentTransactions';
import { calculateStats } from '../../utils/helpers';
import { transactionService } from '../../services/transactionService';
import PageHeader from '../layout/PageHeader';
import Button from '../common/Button';

const Dashboard = ({ transactions, alerts, onRefresh }) => {
  const [generating, setGenerating] = useState(false);
  const stats = calculateStats(transactions);

  const statusData = [
    { name: 'Success', value: stats.success, color: '#10b981' },
    { name: 'Failed', value: stats.failed, color: '#ef4444' },
    { name: 'Processing', value: stats.processing, color: '#f59e0b' }
  ];

  const fraudScoreDistribution = [
    { range: '0-25', count: transactions.filter(t => t.fraudScore < 25).length },
    { range: '25-50', count: transactions.filter(t => t.fraudScore >= 25 && t.fraudScore < 50).length },
    { range: '50-75', count: transactions.filter(t => t.fraudScore >= 50 && t.fraudScore < 75).length },
    { range: '75-100', count: transactions.filter(t => t.fraudScore >= 75).length }
  ];

  const generateTransactions = async (count) => {
    setGenerating(true);
    try {
      await transactionService.generate(count);
      await onRefresh();
    } catch (err) {
      console.error('Error generating transactions:', err);
      alert('Failed to generate transactions');
    } finally {
      setGenerating(false);
    }
  };

  const actions = (
    <>
      <Button
        onClick={() => generateTransactions(5)}
        disabled={generating}
        icon={Plus}
        size="md"
        variant="primary"
      >
        {generating ? 'Generating...' : 'Generate 5'}
      </Button>
      <Button
        onClick={() => generateTransactions(10)}
        disabled={generating}
        icon={RefreshCw}
        size="md"
        className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg"
      >
        {generating ? 'Generating...' : 'Refresh'}
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Real-time transaction analytics and fraud detection overview"
        actions={actions}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Success"
          value={stats.success}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-green-400 to-green-600"
          textColor="text-green-200"
          percentage={stats.successRate}
        />
        <StatCard
          title="Failed"
          value={stats.failed}
          icon={XCircle}
          gradient="bg-gradient-to-br from-red-400 to-red-600"
          textColor="text-red-200"
          percentage={stats.failureRate}
        />
        <StatCard
          title="Processing"
          value={stats.processing}
          icon={Clock}
          gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
          textColor="text-yellow-200"
        />
        <StatCard
          title="Fraud Alerts"
          value={alerts.length}
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
          textColor="text-purple-200"
          alert={alerts.length > 0}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Transaction Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Fraud Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fraudScoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="range"
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
              />
              <YAxis
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar
                dataKey="count"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-100">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Transactions</h4>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-100">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total Amount</h4>
          <p className="text-3xl font-bold text-green-600">₹{stats.totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Average Amount</h4>
          <p className="text-3xl font-bold text-purple-600">₹{stats.avgAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;