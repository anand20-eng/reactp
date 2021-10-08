import React from 'react';
import { Link } from 'react-router-dom';
import { registration } from '../services/authentication';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button, Form, Row, Col, Container, FormGroup, FormControl,
  FormLabel, FormText
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../component/main.css';

const Registration = () => {
  const registrationSchema = Yup.object().shape({
    firstName: Yup.string().max(20).required('firstName is required'),
    email: Yup.string().email('enter proper email').required('email Id is required'),
    password: Yup.string().min(6).required('Password is required')
  });
  const handleOnSubmit = (user) => {
     registration(user).then((response) => {
       console.log(response.data.message);
      toast.success(response.data.message);
    }).catch((error) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    });

  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          email: '',
          password: '',
          roleName: 'user'
        }}

        onSubmit={handleOnSubmit}
        validation Schema={registrationSchema}
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

                <Form.Select aria-label="Default select example" name="roleName" id="work"
                  value={values.roleName}
                  onChange={handleChange}

                >
                  <option disabled>select your Roll </option>
                  <option value='user'> User </option>
                  <option value='admin'> Admin </option>
                </Form.Select>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>FirstName *</FormLabel>
                    <FormControl
                      type="tex t"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={errors.firstName}
                    />
                    {errors.firstName && <FormText className="errors">{errors.firstName}</FormText>}
                  </FormGroup>
                </Row>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>Email *</FormLabel>
                    <FormControl
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={errors.email}
                      autoComplete="false"
                    />
                    {errors.email && <FormText className="errors">{errors.email}</FormText>}
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
                <Button disabled={!isValid} type='submit'>SignUp</Button>
                <Link to='/'> Sign </Link>

              </Form>

            </Container>
          )
        }
      </Formik >

      <ToastContainer />



    </>
  );
};

export default Registration;









