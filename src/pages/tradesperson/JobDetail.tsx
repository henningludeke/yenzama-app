import React from 'react';
import StatusBadge from '../../components/ui/StatusBadge';

const JobDetail: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <button className="text-text-primary font-bold text-xl drop-shadow-md">←</button>
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Job Detail</h1>
        <div className="w-6" />
      </header>
      <main className="p-6 flex flex-col gap-8">
        <section>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">Leaking geyser in ceiling</h2>
            <StatusBadge status="posted" />
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            The geyser is leaking and water is dripping through the bathroom light fitting.
          </p>
          <div className="text-text-secondary text-xs uppercase tracking-tight font-medium mb-1 truncate">Plumbing • Midrand</div>
          <div className="text-error text-[10px] font-bold uppercase tracking-widest bg-error/10 px-2 py-1 rounded-pill inline-block">Urgent</div>
        </section>
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 uppercase tracking-widest text-xs">Submit a Quote</h3>
          <div className="flex flex-col gap-6">
            <section>
              <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Price (ZAR)</label>
              <input
                type="number"
                placeholder="2500"
                className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium"
              />
            </section>
            <section>
              <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Estimated Days</label>
              <input
                type="number"
                placeholder="2"
                className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium"
              />
            </section>
            <section>
              <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Message to Homeowner</label>
              <textarea
                placeholder="I can fix this leak today..."
                className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium h-32 resize-none"
              />
            </section>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-button shadow-lg">Submit Quote</button>
      </div>
    </div>
  );
};

export default JobDetail;
