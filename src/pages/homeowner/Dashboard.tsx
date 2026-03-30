import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/ui/BottomNav';

const Dashboard: React.FC = () => {
  return (
    <div className="pb-20">
      <header className="p-6 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-text-primary mb-1 tracking-tight">YENZAMA</h1>
        <p className="text-text-secondary text-sm">Find a professional tradesperson</p>
      </header>
      <main className="p-6 flex flex-col gap-8">
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4">Core Trades</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Plumbing', 'Electrical', 'Building', 'Painting'].map((trade) => (
              <Link to="/browse" key={trade} className="bg-surface p-4 rounded-card text-center flex flex-col items-center gap-2 shadow-sm border border-gray-50 block">
                <span className="text-2xl">{trade === 'Plumbing' ? '🚰' : trade === 'Electrical' ? '⚡' : trade === 'Building' ? '🧱' : '🎨'}</span>
                <span className="text-xs font-bold text-text-primary uppercase tracking-wider uppercase tracking-wider">{trade}</span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="bg-primary/5 p-4 rounded-card border border-primary/10 flex flex-col items-center text-center gap-3">
            <p className="text-text-primary text-sm font-medium">Need something fixed fast?</p>
            <button className="bg-primary text-white text-xs font-bold py-3 px-6 rounded-pill shadow-lg uppercase tracking-wider">Post a Job</button>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
