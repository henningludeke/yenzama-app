import React from 'react';
import type { JobStatus } from '../../types';

interface StatusBadgeProps {
  status: JobStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'posted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
      case 'in_progress':
        return 'bg-secondary/20 text-secondary';
      case 'completed':
      case 'reviewed':
        return 'bg-success/20 text-success';
      case 'cancelled':
        return 'bg-error/20 text-error';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-pill text-[10px] font-semibold uppercase tracking-wider ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
