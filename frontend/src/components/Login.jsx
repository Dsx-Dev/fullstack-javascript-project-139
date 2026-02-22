import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthProvider';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post('/api/v1/login', values);
        auth.logIn(data);
        navigate('/');
      } catch (err) {
        if (err.response?.status === 401) {
          setAuthFailed(true);
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
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control 
                    name="username" 
                    id="username" 
                    placeholder={t('login.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control 
                    name="password" 
                    id="password" 
                    type="password"
                    placeholder={t('login.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  {authFailed && <Form.Control.Feedback type="invalid">{t('errors.auth')}</Form.Control.Feedback>}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.submit')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4 text-center">
              <span>{t('login.noAccount')} </span><Link to="/signup">{t('login.signup')}</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;