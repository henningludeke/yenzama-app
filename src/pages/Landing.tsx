import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 tracking-tight">YENZAMA</h1>
      <p className="text-lg mb-8 opacity-90 max-w-[280px]">"Let's do it together" — Connecting SA with skilled trades.</p>
      <div className="flex flex-col gap-4 w-full max-w-[280px]">
        <Link to="/auth" className="bg-white text-primary font-bold py-3 px-6 rounded-button shadow-lg block">Sign In</Link>
        <Link to="/auth" className="bg-secondary text-white font-bold py-3 px-6 rounded-button shadow-lg block">Get Started</Link>
      </div>
    </div>
  );
};

export default Landing;
