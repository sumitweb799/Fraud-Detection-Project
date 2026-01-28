import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import TransactionsPage from './components/transactions/TransactionsPage';
import FraudAlertsPage from './components/fraud/FraudAlertsPage';
import HighRiskAccountsPage from './components/highrisk/HighRiskAccountsPage';
import ManualFraudTestPage from './components/manual/ManualFraudTestPage';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import MainLayout from './components/layout/MainLayout';
import Loading from './components/common/Loading';
import { useTransactions } from './hooks/useTransactions';
import { useFraudAlerts } from './hooks/useFraudAlerts';

const AppContent = () => {
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const {
    transactions,
    loading: transactionsLoading,
    refresh: refreshTransactions
  } = useTransactions(isAuthenticated);

  const {
    alerts,
    loading: alertsLoading,
    refresh: refreshAlerts
  } = useFraudAlerts(isAuthenticated);

  // 🔄 Auto-refresh data every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshTransactions();
      refreshAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshTransactions, refreshAlerts]);

  if (authLoading) {
    return <Loading fullScreen message="Initializing application..." />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleRefreshAll = () => {
    refreshTransactions();
    refreshAlerts();
  };

  const renderPage = () => {
    if (transactionsLoading && transactions.length === 0) {
      return <Loading message="Loading data..." />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            transactions={transactions}
            alerts={alerts}
            onRefresh={handleRefreshAll}
          />
        );

      case 'analytics':
        return (
          <AnalyticsPage
            transactions={transactions}
            alerts={alerts}
          />
        );

      case 'transactions':
        return (
          <TransactionsPage
            transactions={transactions}
            onRefresh={refreshTransactions}
          />
        );

      case 'alerts':
        return (
          <FraudAlertsPage
            alerts={alerts}
            onRefresh={refreshAlerts}
          />
        );

      case 'highrisk':
        return <HighRiskAccountsPage />;

      case 'manual':
        return <ManualFraudTestPage />;

      default:
        return (
          <Dashboard
            transactions={transactions}
            alerts={alerts}
            onRefresh={handleRefreshAll}
          />
        );
    }
  };

  return (
    <MainLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onLogout={logout}
      unreadAlerts={alerts.length}
    >
      {renderPage()}
    </MainLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
