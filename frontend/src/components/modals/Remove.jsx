import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/channelsSlice';

const Remove = ({ show, onHide }) => {
  const dispatch = useDispatch();
  // Obtenemos el ID del canal que queremos borrar del estado de la modal
  const channelId = useSelector((state) => state.channels.modal.extraData?.channelId);

  const handleRemove = () => {
    // Aquí enviarás el evento al socket más adelante
    // socket.emit('removeChannel', { id: channelId });
    dispatch(actions.removeChannel(channelId));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar canal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">¿Seguro que quieres eliminar este canal?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="me-2">
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Eliminar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;