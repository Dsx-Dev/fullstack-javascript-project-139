import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
// Aquí importarás el mensajesReducer cuando lo creemos

export default configureStore({
  reducer: {
    channels: channelsReducer,
    // messages: messagesReducer,
  },
});