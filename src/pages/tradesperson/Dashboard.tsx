import React from 'react';
import JobCard from '../../components/JobCard';
import type { Job } from '../../types';
import { GeoPoint, Timestamp } from 'firebase/firestore';

const Dashboard: React.FC = () => {
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
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Job Feed</h1>
        <div className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-pill uppercase tracking-widest">Plumbing</div>
      </header>
      <main className="p-4 flex flex-col gap-4">
        <div className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-2">New Jobs Nearby (1)</div>
        <JobCard job={dummyJob} />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 pb-safe">
        <div className="text-xs text-primary">Job Feed</div>
        <div className="text-xs text-text-secondary">My Quotes</div>
        <div className="text-xs text-text-secondary">Active Jobs</div>
        <div className="text-xs text-text-secondary">Profile</div>
      </nav>
    </div>
  );
};

export default Dashboard;
