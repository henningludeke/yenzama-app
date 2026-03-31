import React from 'react';
import BottomNav from '../../components/ui/BottomNav';
import StatusBadge from '../../components/ui/StatusBadge';
import QuoteCard from '../../components/QuoteCard';
import type { Quote } from '../../types';
import { Timestamp } from 'firebase/firestore';

const JobDetail: React.FC = () => {
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
        <button className="text-text-primary font-bold text-xl drop-shadow-md">←</button>
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Job Detail</h1>
        <div className="w-6" />
      </header>
      <main className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">Leaking geyser in ceiling</h2>
            <StatusBadge status="posted" />
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            The geyser is leaking and water is dripping through the bathroom light fitting.
          </p>
          <div className="text-text-secondary text-xs uppercase tracking-tight font-medium mb-1 truncate">Plumbing • Midrand</div>
          <div className="text-error text-[10px] font-bold uppercase tracking-widest bg-error/10 px-2 py-1 rounded-pill inline-block">Urgent</div>
        </div>
        <div className="mb-8 border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 uppercase tracking-widest text-xs">Received Quotes (1)</h3>
          <QuoteCard quote={dummyQuote} tradespersonName="Jozi Plumbers" />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default JobDetail;
