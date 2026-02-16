useEffect(() => {
  const socket = io();
  
  socket.on('newMessage', (payload) => dispatch(messageActions.addMessage(payload)));
  socket.on('newChannel', (payload) => dispatch(channelActions.addChannel(payload)));
  socket.on('removeChannel', (payload) => dispatch(channelActions.removeChannel(payload.id)));
  socket.on('renameChannel', (payload) => dispatch(channelActions.renameChannel({ id: payload.id, changes: { name: payload.name } })));

  return () => socket.disconnect();
}, [dispatch]);