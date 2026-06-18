import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredToken } from '../services/api';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getStoredToken());

  const refreshProfile = useCallback(async () => {
    const storedToken = getStoredToken();
    setToken(storedToken);
    if (!storedToken) {
      setCurrentUser(null);
      setLoading(false);
      return null;
    }

    try {
      const profile = await authService.getProfile();
      setCurrentUser(profile);
      return profile;
    } catch {
      authService.logout();
      setToken(null);
      setCurrentUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (email, password, remember = true) => {
    const response = await authService.login(email, password, remember);
    setToken(response.token);
    setCurrentUser(response.data);
    return response;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
      refreshProfile,
    }),
    [currentUser, loading, token, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
