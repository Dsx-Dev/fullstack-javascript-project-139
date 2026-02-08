import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('El usuario es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      try {
        // Esta es la ruta de la API del servidor de Hexlet
        const response = await axios.post('/api/v1/login', values);
        
        // El servidor devuelve un token y el nombre de usuario
        console.log('Login exitoso:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Aquí redirigiremos al chat más adelante
        window.location.href = '/'; 
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          alert('Usuario o contraseña incorrectos');
        } else {
          alert('Hubo un error de conexión');
        }
      }
    },
  });

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">Ingresar</h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    placeholder="Tu nombre de usuario"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                  />
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="outline-primary" className="w-100 mb-3" type="submit">
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;