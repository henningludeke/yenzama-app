import React from 'react';
import type { Job } from '../types';
import StatusBadge from './ui/StatusBadge';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-card p-4 shadow-sm flex items-center gap-4">
      <div className="w-16 h-16 bg-surface rounded-card overflow-hidden flex-shrink-0">
        <img
          src={job.photos[0] || 'https://picsum.photos/seed/job/200/200'}
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-text-primary font-bold truncate text-sm flex-1 mr-2">{job.title}</h3>
          <StatusBadge status={job.status} />
        </div>
        <div className="text-text-secondary text-xs font-medium uppercase mb-1">
          {job.tradeCategory} • {job.suburb}
        </div>
        <div className="text-text-secondary text-[10px]">
          Posted {new Date(job.createdAt.toMillis()).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
