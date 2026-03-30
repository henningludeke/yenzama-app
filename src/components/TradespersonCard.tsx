import React from 'react';
import type { TradespersonProfile } from '../types';
import StarRating from './ui/StarRating';

interface TradespersonCardProps {
  profile: TradespersonProfile;
  name: string;
}

const TradespersonCard: React.FC<TradespersonCardProps> = ({ profile, name }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-card p-4 shadow-sm flex items-center gap-4">
      <div className="w-16 h-16 bg-surface rounded-full overflow-hidden flex-shrink-0">
        <img
          src={profile.portfolioPhotos[0] || 'https://picsum.photos/seed/placeholder/200/200'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <h3 className="text-text-primary font-bold truncate text-sm">{name}</h3>
          {profile.verified && <span className="text-success text-xs">✓</span>}
        </div>
        <div className="text-text-secondary text-xs uppercase tracking-tight font-medium mb-1 truncate">
          {profile.trades.join(', ')}
        </div>
        <StarRating rating={profile.rating} reviewCount={profile.reviewCount} />
      </div>
    </div>
  );
};

export default TradespersonCard;
