import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; // Opcional si usas Rollbar
import { I18nextProvider } from 'react-i18next';
import store from './slices/index.js';
import i18n from './i18n.js';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importante para el diseño

// Configuración de Rollbar (opcional para el proyecto final)
const rollbarConfig = {
  accessToken: 'TU_TOKEN_AQUÍ',
  environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 1. Conexión con Redux */}
    <Provider store={store}>
      {/* 2. Conexión con Internacionalización */}
      <I18nextProvider i18n={i18n}>
        {/* 3. Proveedor de errores (opcional) */}
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);