import React from 'react';
import BottomNav from '../../components/ui/BottomNav';

const LeaveReview: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <button className="text-text-primary font-bold text-xl drop-shadow-md">←</button>
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Leave a Review</h1>
        <div className="w-6" />
      </header>
      <main className="p-6 flex flex-col gap-8">
        <section className="flex flex-col items-center gap-4">
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest text-center">Rate your experience</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-4xl text-secondary">★</button>
            ))}
          </div>
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Review Comment</label>
          <textarea
            placeholder="Share your experience with Jozi Plumbers..."
            className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium h-32 resize-none"
          />
        </section>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-button shadow-lg">Submit Review</button>
      </div>
      <BottomNav />
    </div>
  );
};

export default LeaveReview;
