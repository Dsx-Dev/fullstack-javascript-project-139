import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import dsxLogo from '../../assets/dsx-logo.png';

const ChatNavbar = () => {
  const { isAuthenticated, logOut } = useAuth();
  return (
    <nav style={{
      background: '#0a0a0a',
      padding: '0.4rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #B8860B',
      boxShadow: '0 2px 12px rgba(184,134,11,0.3)',
      height: '57px',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={dsxLogo}
          alt="DSX"
          style={{
            height: '40px',
            filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg)',
          }}
        />
      </Link>
      {isAuthenticated && (
        <button
          type="button"
          onClick={logOut}
          style={{
            background: 'transparent',
            border: '1px solid #B8860B',
            color: '#FFD700',
            padding: '0.3rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
          LOG OUT
        </button>
      )}
    </nav>
  );
};

export default ChatNavbar;
