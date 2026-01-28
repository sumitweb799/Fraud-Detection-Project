import React from 'react';
import {
  Shield,
  TrendingUp,
  Activity,
  AlertTriangle,
  Users,
  Send,
  LogOut,
  ChevronRight,
  BarChart2
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, onLogout, unreadAlerts = 0 }) => {
  const menuItems = [
    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard', badge: null },
    { id: 'analytics', icon: BarChart2, label: 'Analytics', badge: null }, // ✅ NEW
    { id: 'transactions', icon: Activity, label: 'Transactions', badge: null },
    { id: 'alerts', icon: AlertTriangle, label: 'Fraud Alerts', },
    { id: 'highrisk', icon: Users, label: 'High Risk', badge: null },
    { id: 'manual', icon: Send, label: 'Manual Test', badge: null }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-2xl z-50">

      {/* Logo Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">FraudProtector</h2>
          </div>
        </div>
        <p className="text-gray-400 text-sm ml-13">AI-Powered Detection</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 mb-auto">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
              ${currentPage === item.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transform scale-[1.02]'
                : 'hover:bg-gray-700 hover:translate-x-1'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.badge !== null && item.badge > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">
                  {item.badge}
                </span>
              )}
              {currentPage === item.id && <ChevronRight className="w-4 h-4" />}
            </div>
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="mb-4 px-4 py-3 bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-400">Signed in as</p>
          <p className="text-sm font-semibold truncate">Admin User</p>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
