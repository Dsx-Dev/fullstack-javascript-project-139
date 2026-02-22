import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices/channelsSlice';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.channels.modal);
  if (!isOpen) return null;

  const modals = { adding: Add, removing: Remove, renaming: Rename };
  const Component = modals[type];
  return <Component show={isOpen} onHide={() => dispatch(actions.closeModal())} />;
};
export default ModalManager;