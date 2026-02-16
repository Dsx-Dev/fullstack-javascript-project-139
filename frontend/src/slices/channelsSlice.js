import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  modal: { isOpen: false, type: null, extraData: null },
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    setCurrentChannel: (state, { payload }) => { state.currentChannelId = payload; },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.currentChannelId === payload) state.currentChannelId = 1;
    },
    renameChannel: channelsAdapter.updateOne,
    openModal: (state, { payload }) => {
      state.modal = { isOpen: true, type: payload.type, extraData: payload.extraData };
    },
    closeModal: (state) => { state.modal.isOpen = false; },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;