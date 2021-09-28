
import React from 'react';
//import {  Link } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify';
import { Form, FormControl, FormGroup, FormLabel, Row, Col, Button, FormText, Container } from 'react-bootstrap';
//import { login } from '../services/authentication';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../component/main.css';

const Login = () => {
  const loginSchema = Yup.object().shape({
    emailId: Yup.string().email('enter proper emailId').max(255).required('Email is required'),
    password:Yup.string().min(6).required('Password is required')
  });

  const handleOnSubmit = (credentials) => {
    console.log('user --', credentials);
    
  };

  return (
    <Formik
      initialValues={{ emailId: '',
        password: '',
        roleName: 'user' }}
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
            </Form>
          </Container>
        )
      }
    </Formik >
  );
};

export default Login;
