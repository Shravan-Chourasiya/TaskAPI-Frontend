import { useEffect, type ReactNode } from 'react';
import { AuthContext } from '@/utils/authContext';
import { apiInstance } from '@/lib/axiosInstance';
import authStore from '@/lib/zustandStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const store = authStore();

  useEffect(() => {
    store.setLoading(true);
    apiInstance.get('/api/v1/user/is-user').then((response) => {
      if (response.status === 200 && response.data && response.data.user) {
        store.login(response.data.user);
      } else {
        store.logout();
      }
    }).catch(() => {
      store.logout();
    }).finally(() => {
      store.setLoading(false);
    });
  }, [])

  const login = async (email: string, password: string) => {
    store.setLoading(true);
    try {
      const response = await apiInstance.post('/api/v1/auth/login', { email, password });
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response from server. Failed to Login. Try again later');
      }
      store.login(response.data.data);
    } catch (error) {
      console.error('Login failed:', error);
      store.logout();
      throw new Error('Login failed. Please check your credentials and try again.');
    } finally {
      store.setLoading(false);
    }
  }

  const logout = async () => {
    store.setLoading(true);
    try {
      const response = await apiInstance.post('/api/v1/auth/logout');
      if (response.status !== 200) {
        console.error('Logout failed with status:', response.status);
        throw new Error(`Logout failed with status: ${response.status}`);
      }
      console.log('Logout successful');
      store.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      store.setLoading(false);
      throw new Error('Logout failed. Please try again.');
    } finally {
      store.setLoading(false);
    }
  };

  const refreshUser = async () => {
    store.setLoading(true);
    try {
      const response = await apiInstance.get('/api/v1/user/is-user');
      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server. Failed to refresh user. Try again later');
      }
      if(!response.data.isUser) {
        store.logout();
        window.location.href = "/login";
        return;
      }
      store.refreshUser(response.data.user);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      store.logout();
    } finally {
      store.setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: store.isAuthenticated, 
      isLoading: store.isLoading, 
      user: store.user, 
      login, 
      logout, 
      refreshUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
