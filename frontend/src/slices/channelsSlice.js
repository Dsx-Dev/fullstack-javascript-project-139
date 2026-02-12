import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1, // Por defecto el canal "general" suele ser ID 1
  modal: { isOpen: false, type: null, extraData: null },
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      // Si borramos el canal donde estamos parados, volvemos al general
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: channelsAdapter.updateOne,
    // Acciones para controlar las ventanas modales
    openModal: (state, { payload }) => {
      state.modal.isOpen = true;
      state.modal.type = payload.type; // 'adding', 'removing', 'renaming'
      state.modal.extraData = payload.extraData || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.extraData = null;
    },
  },
  extraReducers: (builder) => {
    // Aquí puedes reaccionar a acciones de OTROS slices
    // Ejemplo: Si hubiera un slice de mensajes y se borrara todo
    builder.addCase('messages/removeChannelMessages', (state, action) => {
      // Lógica extra si fuera necesaria
    });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;