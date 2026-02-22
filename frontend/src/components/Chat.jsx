import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions as channelActions, selectors as channelSelectors } from '../slices/channelsSlice';
import { actions as messageActions, selectors as messageSelectors } from '../slices/messagesSlice';
import { useAuth } from '../contexts/AuthProvider';
import socket from '../socket';
import ModalManager from './modals/ModalManager';
import MessageForm from './MessageForm';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const messagesEndRef = useRef(null);
  
  const channels = useSelector(channelSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector(messageSelectors.selectAll)
    .filter((m) => m.channelId === currentChannelId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', { headers: auth.getAuthHeader() });
        dispatch(channelActions.setChannels(data.channels));
        dispatch(messageActions.setMessages(data.messages));
      } catch (err) {
        toast.error(t('errors.loading'));
      }
    };
    fetchData();

    socket.on('newMessage', (p) => dispatch(messageActions.addMessage(p)));
    socket.on('newChannel', (p) => dispatch(channelActions.addChannel(p)));
    socket.on('removeChannel', (p) => dispatch(channelActions.removeChannel(p.id)));
    socket.on('renameChannel', (p) => dispatch(channelActions.renameChannel({ id: p.id, changes: p })));

    return () => { socket.off(); };
  }, [dispatch, auth, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light flex-column d-flex">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <b>{t('chat.channels')}</b>
            <Button variant="outline-primary" size="sm" onClick={() => dispatch(channelActions.openModal({ type: 'adding' }))}>+</Button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2 overflow-auto">
            {channels.map((c) => (
              <li key={c.id} className="nav-item w-100">
                {c.removable ? (
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Button variant={c.id === currentChannelId ? 'secondary' : 'light'} className="w-100 text-start text-truncate" onClick={() => dispatch(channelActions.setCurrentChannel(c.id))}>
                      <span className="me-1">#</span>{c.name}
                    </Button>
                    <Dropdown.Toggle split variant={c.id === currentChannelId ? 'secondary' : 'light'}>
                      <span className="visually-hidden">Control</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => dispatch(channelActions.openModal({ type: 'removing', extraData: c }))}>{t('modals.remove')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => dispatch(channelActions.openModal({ type: 'renaming', extraData: c }))}>{t('modals.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button variant={c.id === currentChannelId ? 'secondary' : 'light'} className="w-100 text-start" onClick={() => dispatch(channelActions.setCurrentChannel(c.id))}>
                    <span className="me-1">#</span>{c.name}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {channels.find(c => c.id === currentChannelId)?.name}</b></p>
              <span className="text-muted">{t('chat.messages', { count: messages.length })}</span>
            </div>
            <div className="chat-messages overflow-auto px-5">
              {messages.map((m) => (
                <div key={m.id} className="text-break mb-2"><b>{m.username}</b>: {m.body}</div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <MessageForm currentChannelId={currentChannelId} username={auth.user?.username} />
          </div>
        </Col>
      </Row>
      <ModalManager />
    </Container>
  );
};
export default ChatPage;