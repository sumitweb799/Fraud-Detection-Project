import React from 'react';

const StatCard = ({ title, value, icon: Icon, gradient, textColor, percentage, alert }) => {
  return (
    <div className={`
      ${gradient} rounded-2xl p-6 text-white shadow-xl 
      transform hover:scale-105 transition duration-300 
      ${alert ? 'animate-pulse-slow' : ''}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white text-opacity-90 text-sm font-medium mb-1">{title}</p>
          <p className="text-4xl font-bold mb-2">{value}</p>
          {percentage && (
            <p className="text-white text-opacity-80 text-xs">
              {percentage}% of total
            </p>
          )}
        </div>
        <div className={`${textColor} bg-white bg-opacity-20 p-3 rounded-xl`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;