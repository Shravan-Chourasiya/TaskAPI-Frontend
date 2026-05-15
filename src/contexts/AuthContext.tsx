import { type ReactNode } from 'react';
import { getCookie } from '../utils/cookies';
import { AuthContext } from '@/utils/authContext';


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!getCookie('acToken');

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

