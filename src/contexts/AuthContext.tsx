import { useEffect, type ReactNode, useRef } from 'react';
import { AuthContext } from '@/utils/authContext';
import authStore from '@/lib/zustandStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const store = authStore();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      authStore.getState().checkAuth();
    }
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
