import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  // Subtle border, no drop shadows, balanced padding
  return (
    <div className={`bg-white border border-border rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
