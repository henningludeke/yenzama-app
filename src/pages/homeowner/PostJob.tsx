import React from 'react';
import BottomNav from '../../components/ui/BottomNav';
import PhotoUpload from '../../components/ui/PhotoUpload';

const PostJob: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="p-6 bg-white border-b border-gray-100">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Post a Job</h1>
        <p className="text-text-secondary text-xs font-medium">Explain what needs fixing</p>
      </header>
      <main className="p-6 flex flex-col gap-8">
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Job Title</label>
          <input
            type="text"
            placeholder="Leaking geyser in ceiling"
            className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium"
          />
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Description</label>
          <textarea
            placeholder="Describe the issue in detail..."
            className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium h-32 resize-none"
          />
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Photos (Up to 5)</label>
          <PhotoUpload onPhotoUpload={() => {}} />
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Urgency</label>
          <div className="flex gap-4">
            {['Urgent', 'This Week', 'Flexible'].map((urgency) => (
              <button
                key={urgency}
                className={`flex-1 py-3 px-2 rounded-pill text-[10px] font-bold uppercase tracking-widest ${
                  urgency === 'Urgent' ? 'bg-error/10 text-error border-2 border-error/20' : 'bg-surface text-text-secondary'
                }`}
              >
                {urgency}
              </button>
            ))}
          </div>
        </section>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-button shadow-lg">Post Job</button>
      </div>
      <BottomNav />
    </div>
  );
};

export default PostJob;
