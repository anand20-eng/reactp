/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { getEmployeeById, updateEmployeeData } from '../services/employee';
import {
  FormControl, FormGroup, FormLabel, Row, Col,
  Container, FormText, Button
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const UpdateComponent = ({ match }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  const updateSchema = Yup.object().shape({
    id: Yup.number().required('id is required'),
    employee_name: Yup.string().max(20).required('employee name is required'),
    employee_age: Yup.number().min(6).required('employee_age is required'),
  });

  useEffect(() => {
    getEmpData();
  }, []);

  const getEmpData = () => {
    getEmployeeById(match.params.id).then(response => {
      setUser(response.data);
    }).catch(error => {
      toast.error(error.message);
    });
  };

  const updateEmp = (newUser) => {
    updateEmployeeData(match.params.id, newUser).then(response => {
      console.log(response);
      toast.success(response.data.message);
    }).catch(error => {
      toast.error(error.message);
    });
  };

  const goToAdmin = () => {
    history.push('/admin');
  };

  return (
    <div className=' container-fluid mt-10'>
      <div className="Button" align="right">
        <Button onClick={goToAdmin} > back </Button> </div>

      {user ?
        <Formik
          initialValues={user}
          onSubmit={updateEmp}
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
                      <FormLabel>Employee_Id <FormText className="errors">*</FormText></FormLabel>
                      <FormControl
                        type="number"
                        name="id"
                        value={values.id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.id && !errors.id}
                        isInvalid={errors.id}
                        readOnly
                      />
                      {errors.id && <FormText className="errors">{errors.id}</FormText>}
                    </FormGroup>
                  </Row>


                  <Row className="mb-2">
                    <FormGroup as={Col} md="6" controlId="validationFormik01">
                      <FormLabel>employee_name <FormText className="errors">*</FormText></FormLabel>
                      <FormControl
                        type="text"
                        name="employee_name"
                        value={values.employee_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.employee_name && !errors.employee_name}
                        isInvalid={errors.employee_name}
                      />
                      {errors.employee_name && <FormText className="errors">{errors.employee_name}</FormText>}
                    </FormGroup>
                  </Row>
                  <Row className="mb-2">
                    <FormGroup as={Col} md="6" controlId="validationFormik01">
                      <FormLabel>employee_age <FormText className="errors">*</FormText></FormLabel>
                      <FormControl
                        type="number"
                        name="employee_age"
                        value={values.employee_age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.employee_age && !errors.employee_age}
                        isInvalid={errors.employee_salary}
                      />
                      {errors.employee_age && <FormText className="errors">{errors.employee_age}</FormText>}
                    </FormGroup>
                  </Row>
                  <Row className="mb-2">
                    <FormGroup as={Col} md="6" controlId="validationFormik01">
                      <FormLabel>employee_salary</FormLabel>
                      <FormControl
                        type="number"
                        name="employee_salary"
                        value={values.employee_salary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.employee_salary && !errors.employee_salary}
                      />
                    </FormGroup>
                  </Row>

                  <Button disabled={!isValid}
                    type='submit' >updateUser</Button>
                </Form>
              </Container>
            )}
        </Formik> :
        <p>loading...</p>
      }
      <ToastContainer />
    </div>
  );
};

export default UpdateComponent;
