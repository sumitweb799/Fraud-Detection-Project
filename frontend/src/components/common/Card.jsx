import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  shadow = 'shadow-lg',
  hover = false,
  onClick
}) => {
  return (
    <div
      className={`
        bg-white rounded-2xl
        ${padding}
        ${shadow}
        ${hover ? 'hover:shadow-xl transform hover:scale-[1.02] transition duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;