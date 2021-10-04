import React, { useEffect, useState } from 'react';
import { } from 'react-router';
import { Form, Formik } from 'formik';
import { update } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';


import {
  FormControl, FormGroup, FormLabel, Row, Col,
  Container, FormText, Button
} from 'react-bootstrap';
import { getData } from '../services/localStorageService';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';

// eslint-disable-next-line react/prop-types
const UpdateComponent = ({ match }) => {
  let history = useHistory();
  const key = 'users';
  const users = getData(key) || [];
  const [user, setUser] = useState('');
  const updateSchema = Yup.object().shape({
    firstName: Yup.string().max(20).required('firstName is required'),
    emailId: Yup.string().email('enter proper email').required('email Id is required'),
    password: Yup.string().min(6).required('Password is required')
  });

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const update = users.find(u => u.emailId == match.params.emailId);
    console.log(update);
    update.firstName;
    setUser(update);
  }, []);

  const handleOnSubmit = (user) => {
    const response = update(user);
    console.log(response);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  function goToAdmin() {
    history.push('/admin');
  }

  return (
    <>
      <Button onClick={goToAdmin}> GOBack </Button>
      <Button variant="contained" style={{ float: 'right' }}
        color="primary" className="float-right" onClick={goToAdmin}></Button>
      {user &&
        <Formik
          initialValues={user}
          onSubmit={handleOnSubmit}
          validationSchema={updateSchema}
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
                </Form>
              </Container>
            )}
        </Formik>
      }
      <ToastContainer />
    </>
  );
};

export default UpdateComponent;
