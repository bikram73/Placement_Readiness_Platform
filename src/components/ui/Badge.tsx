import React from 'react';

type Status = 'Not Started' | 'In Progress' | 'Shipped';

interface BadgeProps {
  status?: Status;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  status, 
  variant = 'primary', 
  size = 'md',
  className = '',
  children 
}) => {
  const statusStyles = {
    'Not Started': 'bg-border/50 text-primary/70 border-transparent',
    'In Progress': 'bg-warning/20 text-warning border-warning/30',
    'Shipped': 'bg-success/20 text-success border-success/30',
  };

  const variantStyles = {
    primary: 'bg-accent/10 text-accent border-accent/20',
    secondary: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-4 py-2 text-xs',
    lg: 'px-5 py-2.5 text-sm',
  };

  const appliedStyle = status ? statusStyles[status] : variantStyles[variant];

  return (
    <span className={`rounded-full font-medium border ${appliedStyle} ${sizes[size]} ${className}`}>
      {children || status}
    </span>
  );
};
