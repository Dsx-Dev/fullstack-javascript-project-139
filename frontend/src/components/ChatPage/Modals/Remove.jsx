import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const modalStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const cardStyle = { background: '#2b2d31', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', border: '1px solid #3a3b3f' };

const Remove = () => {
  const dispatch = useDispatch();
  const { isOpen, type, channelId } = useSelector((state) => state.modal);
  const { t } = useTranslation();

  if (type !== 'removeChannel' || !isOpen) return null;

  const handleConfirm = async () => {
    try {
      await dispatch(removeChannel({ id: channelId })).unwrap();
      toast.success(t('success.removeChannel'));
      dispatch(closeModal());
    } catch { toast.error(t('errors.channelRemove')); }
  };

  return (
    <div style={modalStyle} onClick={() => dispatch(closeModal())}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('modal.removeChannel')}</h2>
        <p style={{ color: '#96989d', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{t('modal.confirm')}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => dispatch(closeModal())}
            style={{ background: 'transparent', border: '1px solid #4a4b52', color: '#96989d', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
            {t('cancel')}
          </button>
          <button type="button" onClick={handleConfirm}
            style={{ background: '#ed4245', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
            {t('modal.remove')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Remove;