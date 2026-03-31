import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
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
import DeviceFrame from './components/ui/DeviceFrame';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DeviceFrame>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to={user?.role ? (user.role === 'homeowner' ? '/home' : '/tp/dashboard') : '/auth/role'} /> : <Landing />} />
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/auth/role" /> : <Auth />} />

        {/* Auth Required, but no role needed yet */}
        <Route path="/auth/role" element={
          isAuthenticated ? <RoleSelect /> : <Navigate to="/auth" />
        } />

        {/* Homeowner Routes */}
        <Route path="/home" element={
          <ProtectedRoute allowedRole="homeowner">
            <HomeownerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/browse" element={
          <ProtectedRoute allowedRole="homeowner">
            <BrowseTradespeople />
          </ProtectedRoute>
        } />
        <Route path="/tradesperson/:id" element={
          <ProtectedRoute allowedRole="homeowner">
            <TradespersonProfile />
          </ProtectedRoute>
        } />
        <Route path="/post-job" element={
          <ProtectedRoute allowedRole="homeowner">
            <PostJob />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute allowedRole="homeowner">
            <MyJobs />
          </ProtectedRoute>
        } />
        <Route path="/jobs/:id" element={
          <ProtectedRoute allowedRole="homeowner">
            <HomeownerJobDetail />
          </ProtectedRoute>
        } />
        <Route path="/jobs/:id/review" element={
          <ProtectedRoute allowedRole="homeowner">
            <LeaveReview />
          </ProtectedRoute>
        } />

        {/* Tradesperson Routes */}
        <Route path="/tp/dashboard" element={
          <ProtectedRoute allowedRole="tradesperson">
            <TradespersonDashboard />
          </ProtectedRoute>
        } />
        <Route path="/tp/profile" element={
          <ProtectedRoute allowedRole="tradesperson">
            <MyProfile />
          </ProtectedRoute>
        } />
        <Route path="/tp/jobs/:id" element={
          <ProtectedRoute allowedRole="tradesperson">
            <TradespersonJobDetail />
          </ProtectedRoute>
        } />
        <Route path="/tp/quotes" element={
          <ProtectedRoute allowedRole="tradesperson">
            <MyQuotes />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </DeviceFrame>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
