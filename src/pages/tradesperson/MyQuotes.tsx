import React from 'react';
import QuoteCard from '../../components/QuoteCard';
import type { Quote } from '../../types';
import { Timestamp } from 'firebase/firestore';

const MyQuotes: React.FC = () => {
  const dummyQuote: Quote = {
    quoteId: '1',
    jobId: '1',
    tradespersonId: '123',
    priceZAR: 250000,
    estimatedDays: 2,
    message: 'I can fix this leak today. I have all the tools and materials ready.',
    status: 'pending',
    createdAt: Timestamp.now(),
  };

  return (
    <div className="pb-20">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">My Quotes</h1>
        <div className="text-text-secondary text-xs uppercase tracking-tight font-medium">Pending</div>
      </header>
      <main className="p-4 flex flex-col gap-4">
        <div className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-2">Sent Quotes (1)</div>
        <div className="flex flex-col gap-4 bg-surface p-4 rounded-card border border-gray-100">
          <div className="flex justify-between items-start">
            <h3 className="text-text-primary font-bold text-sm">Leaking geyser in ceiling</h3>
            <div className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-pill uppercase tracking-widest">Pending</div>
          </div>
          <QuoteCard quote={dummyQuote} tradespersonName="Jozi Plumbers" />
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 pb-safe">
        <div className="text-xs text-text-secondary">Job Feed</div>
        <div className="text-xs text-primary">My Quotes</div>
        <div className="text-xs text-text-secondary">Active Jobs</div>
        <div className="text-xs text-text-secondary">Profile</div>
      </nav>
    </div>
  );
};

export default MyQuotes;
