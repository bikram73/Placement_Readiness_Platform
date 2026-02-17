import React from 'react';

export const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  id?: string;
}> = ({ children, className = '', onClick, id }) => {
  return (
    <div 
      id={id}
      className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
