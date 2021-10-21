import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormControl, FormGroup, FormLabel, Row, Col, Button, FormText, Container } from 'react-bootstrap';
import { login, validate } from '../services/authentication';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../component/main.css';
import { getData, setData } from '../services/localStorageService';

const Login = () => {
  const [roleName, setRoleName] = useState('');

  const loginSchema = Yup.object().shape({
    emailId: Yup.string().email('enter proper email').required('email Id is required'),
    password: Yup.string().min(6).required('Password is required')
  });

  useEffect(async () => {
    const token = getData('token');
    if (token) {
      try {
        const response = await validate(token);
        setRoleName(response.data.roleName);
      } catch (error) {
        toast.error(error.message);
      }
    }

  }, []);

  const handleOnSubmit = async (credentials) => {
    try {
      const response = await login(credentials);
      setData('token', response.data.token);
      setRoleName(response.data.user.roleName);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (roleName === 'admin' && getData('token')) {
    return <Redirect to="/admin" />;
  }

  if (roleName === 'user' && getData('token')) {
    return <Redirect to="/user" />;
  }

  return (
    <>
      <Formik
        initialValues={{
          emailId: '',
          password: ''
        }}

        onSubmit={handleOnSubmit}
        validationSchema={loginSchema}
      >
        {
          ({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <Container>
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>Email *</FormLabel>
                    <FormControl
                      type="email"
                      name="emailId"
                      value={values.emailId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.emailId && !errors.emailId}
                      isInvalid={errors.emailId}
                      autoComplete="false"
                    />
                    {errors.emailId && <FormText className="errors">{errors.emailId}</FormText>}
                  </FormGroup>
                </Row>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>Password *</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={errors.password}
                    />
                    {errors.password && <FormText className="errors">{errors.password}</FormText>}
                  </FormGroup>
                </Row>
                <Button disabled={!isValid} type='submit'>Sign</Button>
                <Link to='/Registration'> SignUp </Link>
              </Form>
            </Container>
          )
        }
      </Formik >
    </>
  );
};

export default Login;
