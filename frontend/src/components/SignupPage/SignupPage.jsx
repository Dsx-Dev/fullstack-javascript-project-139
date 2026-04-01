import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import dsxLogo from '../../assets/dsx-logo.png';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setConfirmError('');
    setServerError('');

    let hasError = false;

    if (username.length < 3 || username.length > 20) {
      setUsernameError(t('regRules.name'));
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError(t('regRules.password'));
      hasError = true;
    }
    if (password !== confirm) {
      setConfirmError(t('regRules.passwordEquality'));
      hasError = true;
    }
    if (hasError) return;

    try {
      const { token, username: returnedUser } = await signup(username, password);
      logIn(token, returnedUser);
      navigate('/');
    } catch (err) {
      setServerError(err.response?.status === 409 ? t('errors.userExist') : t('error'));
    }
  };

  const inputStyle = { width: '100%', background: '#383a40', border: '1px solid #1e1f22', color: '#dcddde', padding: '10px 12px', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { color: '#b9bbbe', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' };
  const errorStyle = { color: '#ed4245', fontSize: '0.8rem', marginTop: '4px' };

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e1f22' }}>
      <div style={{ background: '#2b2d31', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', border: '1px solid #2e2f34' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={dsxLogo} alt="DSX" style={{ height: '60px', filter: 'brightness(0) invert(1) sepia(1) saturate(10) hue-rotate(200deg) brightness(1.5) drop-shadow(0 0 10px #7b5cf6)', marginBottom: '1rem' }} />
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{t('registration')}</h2>
        </div>

        {serverError && (
          <div style={{ background: '#3d1515', border: '1px solid #ed4245', color: '#ed4245', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="usernameInput" style={labelStyle}>{t('placeholders.username')}</label>
            <input
              id="usernameInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              autoComplete="username"
            />
            {usernameError && <div style={errorStyle}>{usernameError}</div>}
          </div>
          <div>
            <label htmlFor="passwordInput" style={labelStyle}>{t('placeholders.password')}</label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              autoComplete="new-password"
            />
            {passwordError && <div style={errorStyle}>{passwordError}</div>}
          </div>
          <div>
            <label htmlFor="confirmPasswordInput" style={labelStyle}>{t('placeholders.confirmPassword')}</label>
            <input
              id="confirmPasswordInput"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={inputStyle}
              autoComplete="new-password"
            />
            {confirmError && <div style={errorStyle}>{confirmError}</div>}
          </div>
          <button
            type="submit"
            style={{ background: '#4f46e5', border: 'none', color: '#fff', padding: '12px', borderRadius: '6px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            {t('makeRegistration')}
          </button>
        </form>
        <p style={{ color: '#96989d', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          {t('alreadyHaveAccount')}{' '}
          <Link to="/login" style={{ color: '#7b5cf6', fontWeight: '600' }}>{t('entry')}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;