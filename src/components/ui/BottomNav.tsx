import React from 'react';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed md:absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 pb-safe z-10">
      <div className="text-xs text-primary">Home</div>
      <div className="text-xs text-text-secondary">Browse</div>
      <div className="text-xs text-text-secondary">Post Job</div>
      <div className="text-xs text-text-secondary">My Jobs</div>
      <div className="text-xs text-text-secondary">Profile</div>
    </nav>
  );
};

export default BottomNav;
