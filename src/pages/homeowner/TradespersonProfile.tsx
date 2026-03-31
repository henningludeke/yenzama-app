import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../../components/ui/StarRating';
import { useTradesperson } from '../../hooks/useTradespeople';
import { useTradespersonReviews } from '../../hooks/useReviews';
import { useAuth } from '../../hooks/useAuth';
import { calculateDistance } from '../../lib/helpers';

const TradespersonProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tradesperson, loading: tpLoading, error: tpError } = useTradesperson(id);
  const { reviews, loading: reviewsLoading } = useTradespersonReviews(id);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews'>('portfolio');

  if (tpLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (tpError || !tradesperson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="text-4xl mb-4 opacity-30">⚠️</div>
        <h1 className="text-xl font-bold text-text-primary mb-2">Something went wrong</h1>
        <p className="text-text-secondary text-sm mb-6">{tpError || 'Tradesperson not found'}</p>
        <button onClick={() => navigate(-1)} className="bg-primary text-white font-bold py-3 px-8 rounded-pill uppercase tracking-widest text-xs">Go Back</button>
      </div>
    );
  }

  const distance = user?.location
    ? calculateDistance(
        user.location.latitude,
        user.location.longitude,
        tradesperson.serviceLocation.latitude,
        tradesperson.serviceLocation.longitude
      )
    : null;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide pb-32 bg-white relative">
      <header className="relative h-64 bg-surface">
        <img
          src={tradesperson.portfolioPhotos[0] || `https://picsum.photos/seed/${tradesperson.uid}/400/300`}
          alt="Profile Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-xl drop-shadow-md hover:bg-white/30 transition-colors"
        >
          ←
        </button>
        {tradesperson.verified && (
          <div className="absolute top-4 right-4 bg-success text-white text-[10px] font-bold px-3 py-1.5 rounded-pill uppercase tracking-widest flex items-center gap-1.5 shadow-lg animate-in fade-in slide-in-from-right-4">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            Verified
          </div>
        )}
      </header>

      <main className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-card shadow-xl p-6 border border-gray-100 mb-6">
          <div className="flex flex-col gap-1 mb-4">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight leading-tight">{tradesperson.businessName}</h1>
            <p className="text-text-secondary text-xs uppercase tracking-widest font-bold opacity-60">
              {tradesperson.name} • {tradesperson.trades.join(', ')}
            </p>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-gray-50 mb-4">
            <div className="flex flex-col gap-1">
              <StarRating rating={tradesperson.rating} reviewCount={tradesperson.reviewCount} size="md" />
            </div>
            {distance !== null && (
               <div className="text-right">
                  <span className="block text-primary text-xs font-bold uppercase tracking-wider">{distance}km away</span>
                  <span className="text-[10px] text-text-secondary font-medium">Serving your area</span>
               </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-2 opacity-40">About</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              {tradesperson.bio}
            </p>
          </div>
        </div>

        <div className="flex border-b border-gray-100 mb-6 sticky top-20 bg-white z-10 -mx-6 px-6">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'portfolio' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary opacity-40'}`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary opacity-40'}`}
          >
            Reviews ({tradesperson.reviewCount})
          </button>
        </div>

        <div className="pb-10">
          {activeTab === 'portfolio' ? (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-300">
              {tradesperson.portfolioPhotos.map((photo, index) => (
                <div key={index} className="aspect-[4/3] rounded-card overflow-hidden border border-gray-100 bg-surface shadow-sm">
                  <img src={photo} alt={`Work photo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {reviewsLoading ? (
                <div className="py-10 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
              ) : reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.reviewId} className="bg-surface p-4 rounded-card border border-gray-100 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-text-primary text-xs font-bold uppercase tracking-wider">{review.reviewerName}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed italic opacity-80">"{review.comment}"</p>
                    <span className="text-[10px] text-text-secondary/50 font-medium">
                      {review.createdAt.toDate().toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center opacity-40 italic text-sm">No reviews yet</div>
              )}
            </div>
          )}
        </div>
      </main>

      <div className="fixed md:absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-30">
        <button className="w-full bg-primary text-white font-extrabold py-4 rounded-button shadow-lg shadow-primary/20 uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
          Request Quote
        </button>
      </div>
    </div>
  );
};

export default TradespersonProfile;
