import React from 'react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-text-primary">Sign in with phone</h2>
      <p className="text-text-secondary text-center mb-8">Enter your phone number to receive a verification code.</p>
      <div className="w-full max-w-[300px] flex flex-col gap-4">
        <input
          type="tel"
          placeholder="+27 12 345 6789"
          className="bg-surface border-none rounded-button py-4 px-5 text-text-primary text-lg"
        />
        <Link to="/auth/role" className="bg-primary text-white font-bold py-4 rounded-button shadow-lg text-center block">Send Verification Code</Link>
      </div>
    </div>
  );
};

export default Auth;
