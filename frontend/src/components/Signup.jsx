const signupSchema = Yup.object().shape({
  username: Yup.string().required('Obligatorio').min(3, '3 a 20 caracteres').max(20),
  password: Yup.string().required('Obligatorio').min(6, 'Mínimo 6'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Deben coincidir'),
});

// En el onSubmit de Formik:
try {
  const { data } = await axios.post('/api/v1/signup', { username, password });
  auth.logIn(data); // Guarda token y nombre
  navigate('/');
} catch (err) {
  if (err.response.status === 409) setFieldError('username', 'Este usuario ya existe');
}