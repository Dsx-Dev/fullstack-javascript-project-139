import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 12px 8px', borderBottom: '1px solid #2e2f34' }}>
        <span style={{ color: '#96989d', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {t('channelsTitle')}
        </span>
        <button
          type="button"
          onClick={() => dispatch(openModal({ type: 'addChannel' }))}
          style={{ background: '#3d3f45', border: 'none', color: '#b9bbbe', width: '24px', height: '24px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.background = '#B8860B'; e.target.style.color = '#fff'; }}
          onMouseLeave={e => { e.target.style.background = '#3d3f45'; e.target.style.color = '#b9bbbe'; }}
        >+</button>
      </div>
      <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0, overflowY: 'auto', flex: 1 }}>
        {channels.map((ch) => (
          <li key={ch.id}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '1px 8px', borderRadius: '4px', background: ch.id === currentChannelId ? '#404249' : 'transparent' }}>
              <button
                id={`channel-${ch.id}`}
                type="button"
                onClick={() => dispatch(setCurrentChannelId(ch.id))}
                style={{ flex: 1, background: 'transparent', border: 'none', color: ch.id === currentChannelId ? '#fff' : '#96989d', padding: '6px 8px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', fontWeight: ch.id === currentChannelId ? '600' : '400', transition: 'color 0.15s' }}
                onMouseEnter={e => { if (ch.id !== currentChannelId) e.currentTarget.style.color = '#dcddde'; }}
                onMouseLeave={e => { if (ch.id !== currentChannelId) e.currentTarget.style.color = '#96989d'; }}
              >
                <span style={{ color: '#72767d', marginRight: '4px' }}>#</span>{ch.name}
              </button>
              {ch.removable && (
                <div style={{ display: 'flex', gap: '2px', paddingRight: '6px' }}>
                  <button
                    type="button"
                    onClick={() => dispatch(openModal({ type: 'renameChannel', channelId: ch.id }))}
                    style={{ background: 'transparent', border: 'none', color: '#72767d', cursor: 'pointer', fontSize: '12px', padding: '2px 5px', borderRadius: '3px', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.target.style.color = '#FFD700'; }}
                    onMouseLeave={e => { e.target.style.color = '#72767d'; }}
                  >✏️</button>
                  <button
                    type="button"
                    onClick={() => dispatch(openModal({ type: 'removeChannel', channelId: ch.id }))}
                    style={{ background: 'transparent', border: 'none', color: '#72767d', cursor: 'pointer', fontSize: '12px', padding: '2px 5px', borderRadius: '3px', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.target.style.color = '#ed4245'; }}
                    onMouseLeave={e => { e.target.style.color = '#72767d'; }}
                  >🗑️</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;