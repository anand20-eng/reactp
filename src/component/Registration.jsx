import React from 'react';
import { Link } from 'react-router-dom';
import { registration } from '../services/authentication';
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
    emailId: Yup.string().email('enter proper email').required('email Id is required'),
    password: Yup.string().min(6).required('Password is required')
  });
  const handleOnSubmit = (user) => {
    console.log(user);
    const response = registration(user);
    if(response.success){
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          emailId: '',
          password: '',
          roleName: 'user'
        }}

        onSubmit={handleOnSubmit}
        validationSchema={registrationSchema}
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









