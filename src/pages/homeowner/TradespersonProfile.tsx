import React from 'react';
import StarRating from '../../components/ui/StarRating';

const TradespersonProfile: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="relative h-60 bg-surface">
        <img
          src="https://picsum.photos/seed/tradesperson/400/300"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-xl drop-shadow-md">←</button>
      </header>
      <main className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Jozi Plumbers</h1>
            <div className="text-text-secondary text-xs uppercase tracking-tight font-medium">Plumbing • Sandton, GP</div>
          </div>
          <div className="bg-success text-white text-[10px] font-bold px-2 py-1 rounded-pill uppercase tracking-widest">Verified</div>
        </div>
        <div className="mb-6 flex items-center gap-4">
          <StarRating rating={4.8} reviewCount={15} size="md" />
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold text-text-primary mb-2">About</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Jozi Plumbers provides professional plumbing services for residential and commercial properties in the Sandton area. Our team is available 24/7 for emergencies.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-2">Recent Reviews</h2>
          <div className="bg-surface p-4 rounded-card border border-gray-100 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-text-primary text-xs font-bold font-mono">Thandi M.</span>
              <StarRating rating={5} />
            </div>
            <p className="text-text-secondary text-xs leading-relaxed italic">"Great service! They arrived on time and fixed the leak quickly."</p>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-button shadow-lg">Request Quote</button>
      </div>
    </div>
  );
};

export default TradespersonProfile;
