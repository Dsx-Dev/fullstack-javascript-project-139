import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useTranslation } from 'react-i18next';
import dsxLogo from '../../assets/dsx-logo.png';

const ChatNavbar = () => {
  const { isAuthenticated, logOut } = useAuth();
  const { t } = useTranslation();
  return (
    <nav style={{ background: '#111214', borderBottom: '1px solid #2e2f34', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={dsxLogo} alt="DSX" style={{ height: '38px', filter: 'brightness(0) invert(1) sepia(1) saturate(10) hue-rotate(200deg) brightness(1.5) drop-shadow(0 0 8px #7b5cf6)' }} />
        <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px', letterSpacing: '0.5px' }}>Hexlet Chat</span>
      </Link>
      {isAuthenticated && (
        <button
          type="button"
          onClick={logOut}
          style={{ background: 'transparent', border: '1px solid #4f46e5', color: '#7b5cf6', padding: '8px 20px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4f46e5'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7b5cf6'; }}
        >{t('exit')}</button>
      )}
    </nav>
  );
};

export default ChatNavbar;