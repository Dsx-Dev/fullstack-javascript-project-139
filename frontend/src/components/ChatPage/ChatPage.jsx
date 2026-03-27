import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { fetchInitialData } from '../../slices/thunks.js';
import { useSocket } from '../../contexts/SocketProvider.jsx';
import { messageReceived } from '../../slices/messagesSlice.js';
import ChannelsBox from './Channels/ChannelsBox.jsx';
import MessagesBox from './Messages/MessagesBox.jsx';
import MessageForm from './Messages/MessageForm.jsx';
import Add from './Modals/Add.jsx';
import Remove from './Modals/Remove.jsx';
import Rename from './Modals/Rename.jsx';

const ChatPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchInitialData());
    }
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (!socket) return undefined;
    const handleNewMessage = (payload) => dispatch(messageReceived(payload));
    const handleNewChannel = (payload) => console.log('newChannel:', payload);
    const handleRemoveChannel = (payload) => console.log('removeChannel:', payload);
    const handleRenameChannel = (payload) => console.log('renameChannel:', payload);
    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [socket, dispatch]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 57px)' }}>
      <div style={{ width: '250px', borderRight: '1px solid #333', padding: '1rem', overflowY: 'auto', background: '#111' }}>
        <ChannelsBox />
      </div>
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#1a1a1a' }}>
        <MessagesBox />
        <MessageForm />
      </div>
      <Add />
      <Remove />
      <Rename />
    </div>
  );
};

export default ChatPage;