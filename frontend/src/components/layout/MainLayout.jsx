import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ currentPage, setCurrentPage, onLogout, unreadAlerts, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={onLogout}
        unreadAlerts={unreadAlerts}
      />
      <div className="ml-64 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
