import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login as loginRequest } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import dsxLogo from '../../assets/dsx-logo.png';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setAuthError(null);
      const { token, username: returnedUser } = await loginRequest(values.username, values.password);
      logIn(token, returnedUser);
      navigate('/');
    } catch {
      setAuthError(t('errors.invalidFeedback'));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = { width: '100%', background: '#383a40', border: '1px solid #1e1f22', color: '#dcddde', padding: '10px 12px', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { color: '#b9bbbe', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' };

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e1f22' }}>
      <div style={{ background: '#2b2d31', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', border: '1px solid #2e2f34' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={dsxLogo} alt="DSX" style={{ height: '60px', filter: 'brightness(0) invert(1) sepia(1) saturate(10) hue-rotate(200deg) brightness(1.5) drop-shadow(0 0 10px #7b5cf6)', marginBottom: '1rem' }} />
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Welcome back!</h2>
          <p style={{ color: '#96989d', fontSize: '0.9rem', marginTop: '4px' }}>Log in to continue</p>
        </div>
        {authError && (
          <div style={{ background: '#3d1515', border: '1px solid #ed4245', color: '#ed4245', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {authError}
          </div>
        )}
        <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="username" style={labelStyle}>{t('placeholders.login')}</label>
                <Field id="username" name="username" type="text" placeholder={t('placeholders.login')} style={fieldStyle} />
                <ErrorMessage name="username" component="div" style={{ color: '#ed4245', fontSize: '0.8rem', marginTop: '4px' }} />
              </div>
              <div>
                <label htmlFor="password" style={labelStyle}>{t('placeholders.password')}</label>
                <Field id="password" name="password" type="password" placeholder={t('placeholders.password')} style={fieldStyle} />
                <ErrorMessage name="password" component="div" style={{ color: '#ed4245', fontSize: '0.8rem', marginTop: '4px' }} />
              </div>
              <button type="submit" disabled={isSubmitting}
                style={{ background: '#4f46e5', border: 'none', color: '#fff', padding: '12px', borderRadius: '6px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }}>
                {isSubmitting ? t('loading') : t('entry')}
              </button>
            </Form>
          )}
        </Formik>
        <p style={{ color: '#96989d', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          {t('noAccount')}{' '}
          <Link to="/signup" style={{ color: '#7b5cf6', fontWeight: '600' }}>{t('makeRegistration')}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;