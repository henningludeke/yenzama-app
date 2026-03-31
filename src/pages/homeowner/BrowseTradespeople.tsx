import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import BottomNav from '../../components/ui/BottomNav';
import TradespersonCard from '../../components/TradespersonCard';
import { useTradespeople } from '../../hooks/useTradespeople';
import { useAuth } from '../../hooks/useAuth';
import { calculateDistance } from '../../lib/helpers';
import type { TradeCategory } from '../../types';

const BrowseTradespeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const tradeParam = searchParams.get('trade') as TradeCategory | null;
  const radiusParam = parseInt(searchParams.get('radius') || '50');

  const { tradespeople, loading } = useTradespeople({ trade: tradeParam || undefined });
  const [showFilters, setShowFilters] = useState(false);

  const filteredTradespeople = useMemo(() => {
    if (!user?.location) return tradespeople;

    return tradespeople.filter(tp => {
      const distance = calculateDistance(
        user.location.latitude,
        user.location.longitude,
        tp.serviceLocation.latitude,
        tp.serviceLocation.longitude
      );
      return distance <= radiusParam;
    });
  }, [tradespeople, user?.location, radiusParam]);

  const setTradeFilter = (trade: TradeCategory | 'all') => {
    if (trade === 'all') {
      searchParams.delete('trade');
    } else {
      searchParams.set('trade', trade);
    }
    setSearchParams(searchParams);
  };

  const setRadiusFilter = (radius: number) => {
    searchParams.set('radius', radius.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide pb-20 bg-white">
      <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-text-primary tracking-tight">Browse Pros</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-pill transition-colors ${showFilters ? 'bg-primary text-white' : 'text-primary bg-primary/10'}`}
          >
            {showFilters ? 'Close' : 'Filter'}
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'plumbing', 'electrical', 'building', 'painting'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTradeFilter(t as any)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-pill border transition-all ${
                      (t === 'all' && !tradeParam) || t === tradeParam
                        ? 'bg-primary border-primary text-white shadow-sm'
                        : 'bg-white border-gray-200 text-text-secondary hover:border-primary/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Radius</p>
              <div className="flex gap-2">
                {[10, 25, 50].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRadiusFilter(r)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-pill border transition-all flex-1 ${
                      radiusParam === r
                        ? 'bg-secondary border-secondary text-white shadow-sm'
                        : 'bg-white border-gray-200 text-text-secondary hover:border-secondary/40'
                    }`}
                  >
                    {r}km
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">
            {loading ? 'Searching...' : `${filteredTradespeople.length} Pros found`}
          </div>
          {tradeParam && (
            <button
              onClick={() => setTradeFilter('all')}
              className="text-primary text-[10px] font-bold uppercase"
            >
              Clear Trade
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="text-text-secondary text-sm font-medium animate-pulse">Finding the best experts...</p>
          </div>
        ) : filteredTradespeople.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredTradespeople.map(tp => (
              <Link key={tp.uid} to={`/tradesperson/${tp.uid}`}>
                <TradespersonCard profile={tp} name={tp.name} userLocation={user?.location} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-4xl mb-4 opacity-30">🔍</div>
            <h3 className="text-text-primary font-bold mb-1">No pros found</h3>
            <p className="text-text-secondary text-sm max-w-[200px] mx-auto leading-relaxed">
              Try adjusting your radius or selecting a different category.
            </p>
            <button
              onClick={() => {
                setTradeFilter('all');
                setRadiusFilter(50);
              }}
              className="mt-6 text-primary text-xs font-bold uppercase tracking-wider bg-primary/5 px-6 py-2.5 rounded-pill"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default BrowseTradespeople;
