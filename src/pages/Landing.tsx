import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { seedDatabase } from '../lib/seed/seedData';

const Landing: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (window.confirm('This will seed the database with dummy data. Continue?')) {
      setIsSeeding(true);
      try {
        await seedDatabase();
        alert('Database seeded successfully!');
      } catch (error) {
        console.error('Seeding failed:', error);
        alert('Seeding failed. Check console for details.');
      } finally {
        setIsSeeding(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-primary p-8 text-center">
      <div className="flex-1 flex flex-col items-center justify-center pt-20">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <span className="text-4xl">🤝</span>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tighter">YENZAMA</h1>
        <p className="text-lg text-white/90 font-medium max-w-[280px] leading-relaxed italic">
          "Let's do it together"
        </p>
        <p className="text-white/80 mt-2 font-medium">Connecting SA with skilled trades</p>
      </div>

      <div className="w-full flex flex-col gap-4 mb-8">
        <Link to="/auth" className="btn-secondary w-full text-lg shadow-xl">
          Get Started
        </Link>
        <Link to="/auth" className="text-white font-bold hover:underline py-2">
          I already have an account
        </Link>
      </div>

      <div className="pb-safe flex flex-col items-center gap-4">
        {import.meta.env.DEV && (
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="text-white/60 text-xs font-bold hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/20"
          >
            {isSeeding ? 'SEEDING...' : 'DEBUG: SEED DATABASE'}
          </button>
        )}
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Version 1.0 — March 2026</p>
      </div>
    </div>
  );
};

export default Landing;
