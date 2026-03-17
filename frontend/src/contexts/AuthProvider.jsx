import React, { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userId')) || null);

  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const authValue = useMemo(() => ({ user, logIn, logOut }), [user]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);