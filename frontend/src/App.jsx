import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthProvider';
import Login from './components/Login';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.user ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <div>Página de Chat (¡Próximamente!)</div>
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;