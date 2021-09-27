
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
    emailId: Yup.string().email('enter proper email').required('Email is required')
  });

  const handleOnSubmit = (credentials) => {
    console.log('emailId --', credentials);
  };

  return (
    <Formik
      initialValues={{ emailId: '' }}
      onSubmit={handleOnSubmit}
      validationSchema={loginSchema}>
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
                  <FormLabel>Email</FormLabel>
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
              <Button disabled={!isValid} type='submit'>Sign</Button>
            </Form>
          </Container>
        )
      }
    </Formik >
  );
};

export default Login;
