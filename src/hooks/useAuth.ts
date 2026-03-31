import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useAuthContext();

  const isAuthenticated = !!context.firebaseUser || !!localStorage.getItem('yenzama_mock_auth');

  return {
    ...context,
    isAuthenticated,
  };
};
