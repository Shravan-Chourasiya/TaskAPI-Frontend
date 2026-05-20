import { useEffect, type ReactNode } from 'react';
import { AuthContext } from '@/utils/authContext';
import authStore from '@/lib/zustandStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const store = authStore();

  useEffect(() => {
    const store = authStore.getState();
    store.setLoading(true);
    store.checkAuth();
    store.setLoading(false);
  }, [])



  return (
    <AuthContext.Provider value={{
      isAuthenticated: store.isAuthenticated,
      isLoading: store.isLoading,
      user: store.user,
      login: store.login,
      logout: store.logout,
      refreshUser: store.refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
