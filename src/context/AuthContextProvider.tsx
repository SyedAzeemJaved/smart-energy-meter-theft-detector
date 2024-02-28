import { ReactNode, useState } from 'react';

import { AuthContext } from './AuthContext';
import { AdminProps, UserContextProps } from '@types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminProps>({
    id: 0,
    name: '',
    email: '',
    accessToken: '',
    authenticated: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      accessToken: '',
      authenticated: false,
    }));
  };

  const val: UserContextProps = {
    user: user,
    setUser: setUser,
    logout: handleLogout,
    loading: loading,
    setLoading: setLoading,
  };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
