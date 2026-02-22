import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthProvider';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import ChatPage from './components/Chat';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

const App = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">{t('chat.headerLink')}</Navbar.Brand>
              {auth.user && <Button onClick={auth.logOut}>{t('login.logout')}</Button>}
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </Router>
    </AuthProvider>
  );
};
export default App;