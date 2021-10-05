
import React, { useState } from 'react';
import { registration } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  FormControl, FormGroup, FormLabel, Row, Col,
  Container, FormText, Button
} from 'react-bootstrap';
import * as Yup from 'yup';

const AddNewUser = () => {
  const [goToAdmin, setGoToAdmin] = useState(false);
  const addSchema = Yup.object().shape({
    firstName: Yup.string().max(20).required('firstName is required'),
    emailId: Yup.string().email('enter proper email').required('email Id is required'),
    password: Yup.string().min(6).required('Password is required')
  });
  const handleOnSubmit = (user) => {
    console.log(user);
    SetFormValue(user);
    const response = registration(user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };



  const reset = () => {
    const user = '';
    console.log(user);
  };

  if (goToAdmin) {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      <Formik

        initialValues={{
          firstName: '',
          emailId: '',
          password: ''
        }}
        onSubmit={handleOnSubmit}
        validationSchema={addSchema}
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
              <div className="Button" align="right">
                <Button onClick={() => setGoToAdmin(true)} > back </Button> </div>
              <Form noValidate onSubmit={handleSubmit}>
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
                <Button disabled={!isValid}
                  type='submit' >AddUser</Button>
                <Button type='button' onClick={reset}> Reset </Button>
              </Form>

            </Container>
          )
        }
      </Formik >

      <ToastContainer />
      <ToastContainer />

    </>
  );

};

export default AddNewUser;
