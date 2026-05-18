import { type ReactNode } from 'react';
import { AuthContext } from '@/utils/authContext';
import { useIsVerifiedUser } from '@/hooks/useIsVerifiedUser';


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useIsVerifiedUser();

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

