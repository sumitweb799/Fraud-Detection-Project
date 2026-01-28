import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  IndianRupee,
  Activity
} from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import Card from '../common/Card';

const AnalyticsPage = ({ transactions, alerts }) => {


  const totalAmount = transactions.reduce((s, t) => s + (t.amount || 0), 0);

  const fraudTx = transactions.filter(t => t.fraudScore >= 65);
  const fraudAmount = fraudTx.reduce((s, t) => s + t.amount, 0);


  const channelData = ['ONLINE', 'ATM', 'MOBILE', 'WEB'].map(c => ({
    name: c,
    value: transactions.filter(t => t.channel === c).length
  }));


  const scoreBuckets = [
    { range: '0–25', count: transactions.filter(t => t.fraudScore < 25).length },
    { range: '25–50', count: transactions.filter(t => t.fraudScore >= 25 && t.fraudScore < 50).length },
    { range: '50–75', count: transactions.filter(t => t.fraudScore >= 50 && t.fraudScore < 75).length },
    { range: '75–100', count: transactions.filter(t => t.fraudScore >= 75).length }
  ];


  const fraudVsNormalData = [
    { name: 'Fraud', value: fraudTx.length },
    { name: 'Normal', value: transactions.length - fraudTx.length }
  ];


  const fraudByStatus = ['SUCCESS', 'FAILED', 'PROCESSING'].map(status => ({
    status,
    count: fraudTx.filter(t => t.status === status).length
  }));


  const trendData = transactions
    .slice(-10)
    .map((t, i) => ({ name: `T${i + 1}`, score: t.fraudScore }));

  const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Deep insights into transactions & fraud patterns"
        gradient="from-indigo-600 to-purple-600"
      />


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <IndianRupee className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Fraud Amount</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{fraudAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <Activity className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Transactions</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold">{alerts.length}</p>
            </div>
          </div>
        </Card>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Distribution */}
        <Card>
          <h3 className="text-lg font-bold mb-4">Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={channelData} dataKey="value" nameKey="name" outerRadius={100} label>
                {channelData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Fraud vs Normal */}
        <Card>
          <h3 className="text-lg font-bold mb-4">Fraud vs Normal Transactions</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={fraudVsNormalData} dataKey="value" nameKey="name" outerRadius={100} label>
                <Cell fill="#ef4444" />
                <Cell fill="#22c55e" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Score Distribution */}
        <Card>
          <h3 className="text-lg font-bold mb-4">Fraud Score Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={scoreBuckets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Fraud by Status */}
        <Card>
          <h3 className="text-lg font-bold mb-4">Fraud Count by Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={fraudByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>


      <Card>
        <h3 className="text-lg font-bold mb-4">Fraud Score Trend (Last 10)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
