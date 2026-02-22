import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket, { filter } from '../../socket';

const Add = ({ show, onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => { inputRef.current.focus(); }, []);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: ({ name }) => {
      const cleanName = filter.clean(name);
      socket.emit('newChannel', { name: cleanName }, (r) => {
        if (r.status === 'ok') {
          toast.success(t('channels.created'));
          onHide();
        }
      });
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>{t('modals.add')}</Modal.Title></Modal.Header>
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
export default Add;