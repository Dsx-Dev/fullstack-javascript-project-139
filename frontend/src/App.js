import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthProvider';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import ChatPage from './components/Chat';

/**
 * Componente para proteger rutas privadas.
 * Si el usuario no está logueado, lo manda al /login.
 */
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? children : <Navigate to="/login" state={{ from: location }} />;
};

/**
 * Botón de Logout que aparece solo si el usuario está autenticado.
 */
const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return auth.user ? (
    <Button onClick={auth.logOut} variant="primary">
      {t('login.logout')}
    </Button>
  ) : null;
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          {/* Encabezado persistente */}
          <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">
                {t('chat.headerLink')}
              </Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>

          {/* Configuración de Rutas */}
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />