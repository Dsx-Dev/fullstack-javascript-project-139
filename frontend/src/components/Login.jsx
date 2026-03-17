import React from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialState: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          formik.setErrors({ auth: 'Nombre de usuario o contraseña incorrectos' });
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <h1 className="text-center mb-4">Iniciar sesión</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                name="username"
                id="username"
                placeholder="Tu nombre de usuario"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={formik.errors.username}
              />
              <Form.Label htmlFor="username">Tu nombre de usuario</Form.Label>
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={formik.errors.password}
              />
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              {formik.errors.auth && <div className="invalid-feedback d-block">{formik.errors.auth}</div>}
            </Form.Group>
            <Button type="submit" variant="outline-primary" className="w-100 mb-3">Ingresar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;