import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js'; // Importación directa

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    // Al eliminar un canal, eliminamos sus mensajes
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload.id;
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;