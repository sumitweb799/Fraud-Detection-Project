import React from "react";
import AlertBell from "../common/AlertBell";

const PageHeader = ({ title, subtitle, gradient, actions, refreshTrigger }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {actions}
        <AlertBell refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default PageHeader;
