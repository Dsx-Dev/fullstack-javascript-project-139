import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthProvider';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);
  const inputRef = useRef();

  // Foco automático en el campo de usuario al cargar la página
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    // Validación basada en los requerimientos técnicos de la tarea
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('errors.required'))
        .min(3, t('errors.minMax'))
        .max(20, t('errors.minMax')),
      password: Yup.string()
        .required(t('errors.required'))
        .min(6, t('errors.minPass')),
      confirmPassword: Yup.string()
        .required(t('errors.required'))
        .oneOf([Yup.ref('password')], t('errors.matching')),
    }),
    onSubmit: async (values) => {
      setRegistrationError(null);
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        });
        
        // El servidor responde con { token, username }
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response && err.response.status === 409) {
          // Error 409: El usuario ya existe en la base de datos
          setRegistrationError(t('errors.userExists'));
          inputRef.current.select();
        } else {
          // Otros errores (red, servidor, etc.)
          setRegistrationError(t('errors.network'));
        }
      }
    },
  });

  return (
    <Container className="h-100 mt-5">
      <Row className="justify-content-center align-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">{t('signup.header')}</h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder={t('signup.username')}
                    ref={inputRef}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={(formik.touched.username && !!formik.errors.username) || !!registrationError}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip={false}>
                    {formik.errors.username || registrationError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t('signup.password')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t('signup.confirm')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="outline-primary" 
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
