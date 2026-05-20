import { useEffect, type ReactNode } from 'react';
import { AuthContext } from '@/utils/authContext';
import authStore from '@/lib/zustandStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const store = authStore();

  useEffect(() => {
    authStore.getState().checkAuth();
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
