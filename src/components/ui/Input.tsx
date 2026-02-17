import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input 
      className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-white ${className}`}
      {...props}
    />
  );
};
