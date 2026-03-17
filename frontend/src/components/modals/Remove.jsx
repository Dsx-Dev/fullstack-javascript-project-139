import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from '../../socket';

const Remove = ({ show, onHide }) => {
  const { t } = useTranslation();
  const { extraData } = useSelector((state) => state.channels.modal);

  const handleRemove = () => {
    socket.emit('removeChannel', { id: extraData.id }, (r) => {
      if (r.status === 'ok') {
        toast.success(t('channels.removed'));
        onHide();
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>{t('modals.remove')}</Modal.Title></Modal.Header>
      <Modal.Body>
        <p className="lead">Confirm?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onHide} className="me-2">{t('modals.cancel')}</Button>
          <Button variant="danger" onClick={handleRemove}>{t('modals.confirm')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;