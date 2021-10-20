
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
    id: Yup.number().required('id is required'),
    employee_name: Yup.string().required('employee_name Id is required'),
    employee_age: Yup.string().required('employee_age is required'),
    //employee_salary: Yup.number().required('employee_salary is required')
  });
  const handleOnSubmit = (user) => {
    const response = registration(user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  if (goToAdmin) {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      <Formik

        initialValues={{
          id: '',
          employee_name: '',
          employee_age: '',
          employee_salary: 'user'
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
                    <FormLabel>id *</FormLabel>
                    <FormControl
                      type="number"
                      name="id"
                      value={values.id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.id && !errors.id}
                      isInvalid={errors.id}
                    />
                    {errors.id && <FormText className="errors">{errors.id}</FormText>}
                  </FormGroup>
                </Row>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>employee_name *</FormLabel>
                    <FormControl
                      type="text"
                      name="employee_name"
                      value={values.employee_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.employee_name && !errors.employee_name}
                      isInvalid={errors.employee_name}
                      autoComplete="false"
                    />
                    {errors.employee_name && <FormText className="errors">{errors.employee_name}</FormText>}
                  </FormGroup>
                </Row>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>employee_age *</FormLabel>
                    <FormControl
                      type="number"
                      name="employee_age"
                      value={values.employee_age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.employee_age && !errors.employee_age}
                      isInvalid={errors.employee_age}
                    />
                    {errors.employee_age && <FormText className="errors">{errors.employee_age}</FormText>}
                  </FormGroup>
                </Row>
                <Row className="mb-2">
                  <FormGroup as={Col} md="6" controlId="validationFormik01">
                    <FormLabel>employee_salary *</FormLabel>
                    <FormControl
                      type="number"
                      name="employee_salary"
                      value={values.employee_salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.employee_salary && !errors.employee_salary}
                      isInvalid={errors.employee_salary}
                    />
                    {errors.employee_salary && <FormText className="errors">{errors.employee_salary}</FormText>}
                  </FormGroup>
                </Row>
                <Button disabled={!isValid}
                  type='submit' >AddUser</Button>
                <Button type='reset'> Reset </Button>
              </Form>

            </Container>
          )
        }
      </Formik >

      <ToastContainer />

    </>
  );

};

export default AddNewUser;
