import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket, { filter } from '../../socket';

const Rename = ({ show, onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { extraData } = useSelector((state) => state.channels.modal);

  useEffect(() => { inputRef.current.select(); }, []);

  const formik = useFormik({
    initialValues: { name: extraData.name },
    onSubmit: ({ name }) => {
      const cleanName = filter.clean(name);
      socket.emit('renameChannel', { id: extraData.id, name: cleanName }, (r) => {
        if (r.status === 'ok') {
          toast.success(t('channels.renamed'));
          onHide();
        }
      });
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>{t('modals.rename')}</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control name="name" ref={inputRef} onChange={formik.handleChange} value={formik.values.name} className="mb-2" />
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">{t('modals.cancel')}</Button>
            <Button variant="primary" type="submit">{t('modals.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Rename;