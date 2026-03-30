import React from 'react';
import PhotoUpload from '../../components/ui/PhotoUpload';

const MyProfile: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Edit Profile</h1>
        <button className="text-primary text-xs font-bold uppercase tracking-wider">Save</button>
      </header>
      <main className="p-6 flex flex-col gap-8">
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Business Name</label>
          <input
            type="text"
            defaultValue="Jozi Plumbers"
            className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium"
          />
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Bio</label>
          <textarea
            defaultValue="Professional plumbing services for your home."
            className="w-full bg-surface border-none rounded-button py-4 px-5 text-text-primary text-sm font-medium h-32 resize-none"
          />
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Portfolio Photos (Up to 10)</label>
          <PhotoUpload onPhotoUpload={() => {}} maxPhotos={10} />
        </section>
        <section>
          <label className="block text-text-primary text-xs font-bold uppercase tracking-widest mb-2">Trades</label>
          <div className="flex flex-wrap gap-2">
            {['Plumbing', 'Electrical', 'Building', 'Painting'].map((trade) => (
              <button
                key={trade}
                className={`py-2 px-4 rounded-pill text-xs font-bold uppercase tracking-widest \${
                  trade === 'Plumbing' ? 'bg-primary text-white' : 'bg-surface text-text-secondary'
                }`}
              >
                {trade}
              </button>
            ))}
          </div>
        </section>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 pb-safe">
        <div className="text-xs text-text-secondary">Job Feed</div>
        <div className="text-xs text-text-secondary">My Quotes</div>
        <div className="text-xs text-text-secondary">Active Jobs</div>
        <div className="text-xs text-primary">Profile</div>
      </nav>
    </div>
  );
};

export default MyProfile;
