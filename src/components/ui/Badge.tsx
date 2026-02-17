import React from 'react';

type Status = 'Not Started' | 'In Progress' | 'Shipped';

export const Badge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = {
    'Not Started': 'bg-border/50 text-primary/70 border-transparent',
    'In Progress': 'bg-warning/20 text-warning border-warning/30',
    'Shipped': 'bg-success/20 text-success border-success/30',
  };

  return (
    <span className={`px-4 py-2 rounded-full text-xs font-medium border ${styles[status] || styles['Not Started']}`}>
      {status}
    </span>
  );
};
