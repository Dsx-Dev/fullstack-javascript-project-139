import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { addChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const modalStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const cardStyle = { background: '#2b2d31', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', border: '1px solid #3a3b3f' };
const inputStyle = { width: '100%', background: '#383a40', border: '1px solid #4f46e5', color: '#dcddde', padding: '10px 12px', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
const btnPrimary = { background: '#4f46e5', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' };
const btnSecondary = { background: 'transparent', border: '1px solid #4a4b52', color: '#96989d', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };

const Add = () => {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState('');
  const inputRef = useRef(null);
  const { items: channels } = useSelector((state) => state.channels);
  const { isOpen, type } = useSelector((state) => state.modal);
  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'addChannel' && isOpen && inputRef.current) inputRef.current.focus();
  }, [type, isOpen]);

  if (type !== 'addChannel' || !isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;
    if (channels.some((ch) => ch.name === channelName.trim())) { toast.error(t('modal.unique')); return; }
    try {
      await dispatch(addChannel({ name: channelName.trim() })).unwrap();
      toast.success(t('success.newChannel'));
      dispatch(closeModal());
      setChannelName('');
    } catch (err) {
      toast.error(t('errors.channelAdd'));
    }
  };

  return (
    <div style={modalStyle} onClick={() => dispatch(closeModal())}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          Add channel
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ color: '#b9bbbe', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Channel name
            </label>
            <input id="name" name="name" ref={inputRef} type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="new-channel" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => dispatch(closeModal())} style={btnSecondary}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#7b5cf6'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#4a4b52'}
            >Cancel</button>
            <button type="submit" style={btnPrimary}
              onMouseEnter={e => e.currentTarget.style.background = '#4338ca'}
              onMouseLeave={e => e.currentTarget.style.background = '#4f46e5'}
            >Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;