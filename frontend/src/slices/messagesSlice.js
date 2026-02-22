import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, { payload }) => {
      const allMessages = Object.values(state.entities);
      const restMessages = allMessages.filter((m) => m.channelId !== payload);
      messagesAdapter.setAll(state, restMessages);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;