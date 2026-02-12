import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

const AddChannel = ({ show, onHide }) => {
  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values) => {
      console.log('Nuevo canal:', values.name);
      // Aquí irá la lógica para enviar al servidor vía Socket o API
      onHide();
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar canal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoFocus
            />
            <Form.Label htmlFor="name" className="visually-hidden">Nombre del canal</Form.Label>
            <div className="d-flex justify-content-end mt-2">
              <Button variant="secondary" onClick={onHide} className="me-2">Cancelar</Button>
              <Button variant="primary" type="submit">Enviar</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;