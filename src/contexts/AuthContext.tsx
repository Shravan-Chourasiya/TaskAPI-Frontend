import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from '@/utils/authContext';
import { apiInstance } from '@/lib/axiosInstance';


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthContextType['user']>(null)

  useEffect(() => {
    apiInstance.get('/api/v1/user/is-user').then((response) => {
      if (response.status === 200 && response.data && response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }).catch(() => {
      setIsAuthenticated(false);
      setUser(null);
    });
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiInstance.post('/api/v1/auth/login', { email, password });
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response from server. Failed to Login. Try again later');
      }
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await apiInstance.post('/api/v1/auth/logout');
      if (response.status !== 200) {
        console.error('Logout failed with status:', response.status);
        throw new Error(`Logout failed with status: ${response.status}`);
      }
      console.log('Logout successful');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const response = await apiInstance.get('/api/v1/user/is-user');
      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server. Failed to refresh user. Try again later');
      }
      if(!response.data.isUser) {
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = "/login";
        return;
      }
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

