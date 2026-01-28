import React from 'react';

const EmptyState = ({
  icon: Icon,
  title,
  message,
  action,
  actionLabel,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {Icon && <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
      {title && <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>}
      {message && <p className="text-gray-600 mb-4">{message}</p>}
      {action && actionLabel && (
        <button
          onClick={action}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;