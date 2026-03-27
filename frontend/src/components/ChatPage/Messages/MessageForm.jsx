import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useAuth } from '../../../contexts/AuthProvider.jsx';
import { addMessage } from '../../../slices/thunks.js';

const MessageForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { username } = useAuth();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addMessage({ body: leoProfanity.clean(text), channelId: currentChannelId, username: username || 'anon' }));
    setText('');
  };

  return (
    <div style={{ padding: '0 16px 16px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', background: '#383a40', borderRadius: '8px', padding: '4px 8px', gap: '8px' }}>
        <span style={{ color: '#72767d', fontSize: '20px', paddingLeft: '4px' }}>+</span>
        <input
          type="text"
          placeholder={t('placeholders.newMessage')}
          aria-label={t('newMessage')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', color: '#dcddde', fontSize: '15px', outline: 'none', padding: '8px 4px' }}
        />
        <button
          type="submit"
          style={{ background: text.trim() ? '#B8860B' : '#3d3f45', border: 'none', color: text.trim() ? '#000' : '#72767d', padding: '6px 16px', borderRadius: '4px', fontWeight: '700', cursor: text.trim() ? 'pointer' : 'default', fontSize: '14px', transition: 'all 0.2s' }}
        >
          {t('send')}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;