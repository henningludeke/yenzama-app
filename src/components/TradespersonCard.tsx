import React from 'react';
import type { TradespersonProfile } from '../types';
import StarRating from './ui/StarRating';
import { calculateDistance } from '../lib/helpers';
import { GeoPoint } from 'firebase/firestore';

interface TradespersonCardProps {
  profile: TradespersonProfile;
  name: string;
  userLocation?: GeoPoint;
}

const TradespersonCard: React.FC<TradespersonCardProps> = ({ profile, name, userLocation }) => {
  const distance = userLocation
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        profile.serviceLocation.latitude,
        profile.serviceLocation.longitude
      )
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-card p-4 shadow-sm flex items-center gap-4 hover:border-primary/20 transition-colors">
      <div className="w-16 h-16 bg-surface rounded-full overflow-hidden flex-shrink-0 relative">
        <img
          src={profile.portfolioPhotos[0] || `https://picsum.photos/seed/${profile.uid}/200/200`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-0.5">
          <h3 className="text-text-primary font-bold truncate text-sm leading-tight">{name}</h3>
          {profile.verified && (
            <div className="bg-success/10 p-0.5 rounded-full">
              <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-1.5">
          {profile.trades.map(trade => (
            <span key={trade} className="text-[10px] bg-surface text-text-secondary px-2 py-0.5 rounded-pill border border-gray-100 font-bold uppercase tracking-wider">
              {trade}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <StarRating rating={profile.rating} reviewCount={profile.reviewCount} />
          {distance !== null && (
            <span className="text-[10px] font-bold text-text-secondary bg-gray-50 px-1.5 py-0.5 rounded">
              {distance}km
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradespersonCard;
