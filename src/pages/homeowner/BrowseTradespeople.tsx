import React from 'react';
import BottomNav from '../../components/ui/BottomNav';
import TradespersonCard from '../../components/TradespersonCard';
import type { TradespersonProfile } from '../../types';
import { GeoPoint } from 'firebase/firestore';

const BrowseTradespeople: React.FC = () => {
  const dummyProfile: TradespersonProfile = {
    uid: '123',
    businessName: 'Jozi Plumbers',
    bio: 'Professional plumbing services for your home.',
    trades: ['plumbing'],
    serviceRadius: 25,
    serviceLocation: new GeoPoint(0, 0),
    portfolioPhotos: [],
    verified: true,
    rating: 4.8,
    reviewCount: 15,
  };

  return (
    <div className="pb-20">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Browse Tradespeople</h1>
        <button className="text-primary text-xs font-bold uppercase tracking-wider">Filter</button>
      </header>
      <main className="p-4 flex flex-col gap-4">
        <div className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-2">Plumbers near you (1)</div>
        <TradespersonCard profile={dummyProfile} name="Jozi Plumbers" />
      </main>
      <BottomNav />
    </div>
  );
};

export default BrowseTradespeople;
