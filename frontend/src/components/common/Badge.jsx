import React from 'react';
import { STATUS_COLORS } from '../../utils/constants';

const Badge = ({ status, children, variant = 'default', className = '' }) => {
  const colors = STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800'
  };

  const variants = {
    default: `${colors.bg} ${colors.text}`,
    outline: `border-2 ${colors.border} ${colors.text} bg-transparent`,
    solid: `${colors.bg} ${colors.text}`
  };

  return (
    <span className={`
      inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${variants[variant]}
      ${className}
    `}>
      {children || status}
    </span>
  );
};

export default Badge;