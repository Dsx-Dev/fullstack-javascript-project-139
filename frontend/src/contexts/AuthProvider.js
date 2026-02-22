import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser ? savedUser : null);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);