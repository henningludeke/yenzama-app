import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';

const RoleSelect: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSubmit = async () => {
    if (!selectedRole) return;
    setLoading(true);
    await setRole(selectedRole);
    if (selectedRole === 'homeowner') {
      navigate('/home');
    } else {
      navigate('/tp/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[320px] flex flex-col gap-8 text-center">
        <div>
          <h2 className="text-4xl font-extrabold text-text-primary tracking-tighter mb-2 leading-none">
            I'm looking for...
          </h2>
          <p className="text-text-secondary font-medium italic">
            Choose your journey on Yenzama
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => setSelectedRole('homeowner')}
            className={`flex flex-col items-center gap-2 p-8 rounded-card border-2 transition-all shadow-lg active:scale-95 ${
              selectedRole === 'homeowner'
                ? 'bg-primary/10 border-primary text-primary scale-105'
                : 'bg-surface border-transparent text-text-secondary opacity-60'
            }`}
          >
            <span className="text-5xl">🏠</span>
            <span className="text-lg font-extrabold">Homeowner</span>
            <span className="text-xs font-medium uppercase tracking-widest opacity-80 leading-relaxed px-4">
              I need to hire a professional
            </span>
          </button>

          <button
            onClick={() => setSelectedRole('tradesperson')}
            className={`flex flex-col items-center gap-2 p-8 rounded-card border-2 transition-all shadow-lg active:scale-95 ${
              selectedRole === 'tradesperson'
                ? 'bg-secondary/10 border-secondary text-secondary scale-105'
                : 'bg-surface border-transparent text-text-secondary opacity-60'
            }`}
          >
            <span className="text-5xl">🛠️</span>
            <span className="text-lg font-extrabold">Tradesperson</span>
            <span className="text-xs font-medium uppercase tracking-widest opacity-80 leading-relaxed px-4">
              I'm a skilled pro seeking work
            </span>
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleRoleSubmit}
            disabled={!selectedRole || loading}
            className="btn-primary w-full py-4 text-xl disabled:opacity-30 shadow-2xl"
          >
            {loading ? 'Setting up...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
