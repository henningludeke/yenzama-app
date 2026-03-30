import React from 'react';
import BottomNav from '../../components/ui/BottomNav';
import JobCard from '../../components/JobCard';
import type { Job } from '../../types';
import { GeoPoint, Timestamp } from 'firebase/firestore';

const MyJobs: React.FC = () => {
  const dummyJob: Job = {
    jobId: '1',
    homeownerId: '123',
    title: 'Leaking geyser in ceiling',
    description: 'The geyser is leaking and water is dripping through the bathroom light fitting.',
    tradeCategory: 'plumbing',
    location: new GeoPoint(0, 0),
    suburb: 'Midrand',
    urgency: 'urgent',
    photos: [],
    status: 'posted',
    acceptedQuoteId: null,
    createdAt: Timestamp.now(),
  };

  return (
    <div className="pb-20">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">My Jobs</h1>
        <div className="text-text-secondary text-xs uppercase tracking-tight font-medium">All Jobs</div>
      </header>
      <main className="p-4 flex flex-col gap-4">
        <div className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-2">Active Jobs (1)</div>
        <JobCard job={dummyJob} />
      </main>
      <BottomNav />
    </div>
  );
};

export default MyJobs;
