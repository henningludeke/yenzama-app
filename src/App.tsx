import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import RoleSelect from './pages/RoleSelect';
import HomeownerDashboard from './pages/homeowner/Dashboard';
import BrowseTradespeople from './pages/homeowner/BrowseTradespeople';
import TradespersonProfile from './pages/homeowner/TradespersonProfile';
import PostJob from './pages/homeowner/PostJob';
import MyJobs from './pages/homeowner/MyJobs';
import HomeownerJobDetail from './pages/homeowner/JobDetail';
import LeaveReview from './pages/homeowner/LeaveReview';
import TradespersonDashboard from './pages/tradesperson/Dashboard';
import MyProfile from './pages/tradesperson/MyProfile';
import TradespersonJobDetail from './pages/tradesperson/JobDetail';
import MyQuotes from './pages/tradesperson/MyQuotes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/role" element={<RoleSelect />} />

        {/* Homeowner Routes */}
        <Route path="/home" element={<HomeownerDashboard />} />
        <Route path="/browse" element={<BrowseTradespeople />} />
        <Route path="/tradesperson/:id" element={<TradespersonProfile />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<MyJobs />} />
        <Route path="/jobs/:id" element={<HomeownerJobDetail />} />
        <Route path="/jobs/:id/review" element={<LeaveReview />} />

        {/* Tradesperson Routes */}
        <Route path="/tp/dashboard" element={<TradespersonDashboard />} />
        <Route path="/tp/profile" element={<MyProfile />} />
        <Route path="/tp/jobs/:id" element={<TradespersonJobDetail />} />
        <Route path="/tp/quotes" element={<MyQuotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
