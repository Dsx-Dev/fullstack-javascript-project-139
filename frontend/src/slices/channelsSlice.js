import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 1 },
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((c) => c.id !== payload.id);
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((c) => c.id === payload.id);
      if (channel) {
        channel.name = payload.name;
      }
    },
  },
});

// Exporta las acciones individualmente para que messagesSlice las encuentre
export const { 
  setChannels, 
  setCurrentChannel, 
  addChannel, 
  removeChannel, 
  renameChannel 
} = channelsSlice.actions;

export default channelsSlice.reducer;