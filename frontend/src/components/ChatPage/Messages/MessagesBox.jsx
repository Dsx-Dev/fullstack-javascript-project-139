import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesBox = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const bottomRef = useRef(null);

  const filteredMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {filteredMessages.length === 0 && (
        <div style={{ color: '#72767d', textAlign: 'center', marginTop: '40px', fontSize: '14px' }}>
          {t('messageBody')}
        </div>
      )}
      {filteredMessages.map((msg) => (
        <div key={msg.id} style={{ display: 'flex', gap: '12px', padding: '4px 8px', borderRadius: '4px', transition: 'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#2e2f34'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#B8860B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#000', fontSize: '14px', flexShrink: 0 }}>
            {(msg.username || 'A')[0].toUpperCase()}
          </div>
          <div>
            <span style={{ color: '#FFD700', fontWeight: '600', fontSize: '14px', marginRight: '8px' }}>
              {msg.username || 'anon'}
            </span>
            <span style={{ color: '#72767d', fontSize: '11px' }}>Today</span>
            <div style={{ color: '#dcddde', fontSize: '15px', marginTop: '2px' }}>{msg.body}</div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesBox;