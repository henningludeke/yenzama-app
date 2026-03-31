import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/ui/BottomNav';
import { useAuth } from '../../hooks/useAuth';
import { useTradespeople } from '../../hooks/useTradespeople';
import { useHomeownerJobs } from '../../hooks/useJobs';
import TradespersonCard from '../../components/TradespersonCard';
import StatusBadge from '../../components/ui/StatusBadge';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tradespeople, loading: tpLoading } = useTradespeople();
  const { jobs } = useHomeownerJobs(user?.uid);

  // Get first 3 tradespeople as "nearby" preview
  const nearbyTPs = tradespeople.slice(0, 3);

  // Get first 2 active jobs
  const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'reviewed' && j.status !== 'cancelled').slice(0, 2);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide pb-20">
      <header className="p-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">YENZAMA</h1>
            <p className="text-text-secondary text-xs font-medium">Hello, {user?.displayName?.split(' ')[0] || 'there'}</p>
          </div>
          <div className="w-10 h-10 bg-surface rounded-full overflow-hidden border-2 border-primary/20">
            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=1B6B4A&color=fff`} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Search for a trade or service..."
            className="w-full bg-surface border border-gray-200 rounded-pill py-3 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-8">
        {/* Core Trades */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">Core Trades</h2>
            <Link to="/browse" className="text-primary text-xs font-bold uppercase tracking-wider">See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Plumbing', icon: '🚰', slug: 'plumbing' },
              { name: 'Electrical', icon: '⚡', slug: 'electrical' },
              { name: 'Building', icon: '🧱', slug: 'building' },
              { name: 'Painting', icon: '🎨', slug: 'painting' }
            ].map((trade) => (
              <Link
                to={`/browse?trade=${trade.slug}`}
                key={trade.name}
                className="bg-white p-4 rounded-card text-center flex flex-col items-center gap-2 shadow-sm border border-gray-100 hover:border-primary/20 transition-all active:scale-95"
              >
                <span className="text-3xl filter drop-shadow-sm">{trade.icon}</span>
                <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">{trade.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Active Jobs Summary */}
        {activeJobs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">Active Jobs</h2>
              <Link to="/jobs" className="text-primary text-xs font-bold uppercase tracking-wider">Manage</Link>
            </div>
            <div className="flex flex-col gap-3">
              {activeJobs.map(job => (
                <Link to={`/jobs/${job.jobId}`} key={job.jobId} className="bg-white p-4 rounded-card border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-text-primary truncate max-w-[180px]">{job.title}</span>
                    <span className="text-[10px] text-text-secondary uppercase font-bold tracking-tight">{job.tradeCategory} • {job.suburb}</span>
                  </div>
                  <StatusBadge status={job.status} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Nearby Tradespeople Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary tracking-tight">Nearby Pros</h2>
            <Link to="/browse" className="text-primary text-xs font-bold uppercase tracking-wider">Explore</Link>
          </div>
          <div className="flex flex-col gap-4">
            {tpLoading ? (
              <div className="py-10 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              nearbyTPs.map(tp => (
                <Link key={tp.uid} to={`/tradesperson/${tp.uid}`}>
                  <TradespersonCard profile={tp} name={tp.name} userLocation={user?.location} />
                </Link>
              ))
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mb-4">
          <div className="bg-primary p-6 rounded-card shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white text-lg font-bold mb-1">Need a Quick Quote?</h3>
              <p className="text-white/80 text-xs mb-4 max-w-[200px]">Post your job details and receive quotes from local experts.</p>
              <Link to="/post-job" className="inline-block bg-secondary text-white text-[10px] font-extrabold py-2.5 px-6 rounded-pill uppercase tracking-widest shadow-md active:scale-95 transition-transform">
                Post a Job Now
              </Link>
            </div>
            <div className="absolute top-[-20%] right-[-10%] text-8xl opacity-10 rotate-12 select-none">
              🔨
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
