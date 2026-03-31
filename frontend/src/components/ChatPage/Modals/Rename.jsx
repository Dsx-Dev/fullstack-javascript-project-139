import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { renameChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const modalStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const cardStyle = { background: '#2b2d31', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', border: '1px solid #3a3b3f' };
const inputStyle = { width: '100%', background: '#383a40', border: '1px solid #4f46e5', color: '#dcddde', padding: '10px 12px', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' };
const btnPrimary = { background: '#4f46e5', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' };
const btnSecondary = { background: 'transparent', border: '1px solid #4a4b52', color: '#96989d', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };

const Rename = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const inputRef = useRef(null);
  const { items: channels } = useSelector((state) => state.channels);
  const { isOpen, type, channelId } = useSelector((state) => state.modal);
  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'renameChannel' && isOpen) {
      const current = channels.find((ch) => ch.id === channelId);
      if (current) setNewName(current.name);
      if (inputRef.current) inputRef.current.focus();
    }
  }, [type, isOpen]);

  if (type !== 'renameChannel' || !isOpen) return null;

  const currentChannel = channels.find((ch) => ch.id === channelId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    if (channels.some((ch) => ch.name === newName.trim())) { toast.error(t('modal.unique')); return; }
    try {
      await dispatch(renameChannel({ id: channelId, newName: newName.trim() })).unwrap();
      toast.success(t('success.renameChannel'));
      dispatch(closeModal());
    } catch { toast.error(t('errors.channelRename')); }
  };

  return (
    <div style={modalStyle} onClick={() => dispatch(closeModal())}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('modal.renameChannel')}</h2>
        <p style={{ color: '#96989d', fontSize: '0.875rem', marginBottom: '1.5rem' }}>#{currentChannel?.name}</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="name" style={{ color: '#b9bbbe', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t('modal.channelName')}</label>
            <input ref={inputRef} id="name" name="name" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => dispatch(closeModal())} style={btnSecondary}>{t('cancel')}</button>
            <button type="submit" style={btnPrimary}>{t('modal.rename')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rename;