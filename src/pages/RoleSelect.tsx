import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelect: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-text-primary">I'm looking for...</h2>
      <p className="text-text-secondary text-center mb-8">Choose your role to continue.</p>
      <div className="w-full max-w-[300px] flex flex-col gap-6">
        <Link to="/home" className="bg-primary/10 border-2 border-primary text-primary font-bold py-6 rounded-card shadow-lg flex flex-col items-center gap-2 block">
          <span className="text-3xl">🏠</span>
          <span>Homeowner</span>
          <span className="text-xs font-normal opacity-80">I need a tradesperson</span>
        </Link>
        <Link to="/tp/dashboard" className="bg-secondary/10 border-2 border-secondary text-secondary font-bold py-6 rounded-card shadow-lg flex flex-col items-center gap-2 block">
          <span className="text-3xl">🛠️</span>
          <span>Tradesperson</span>
          <span className="text-xs font-normal opacity-80">I'm a professional</span>
        </Link>
      </div>
    </div>
  );
};

export default RoleSelect;
