import React, { useState, useEffect } from 'react';
import { getData, } from '../services/localStorageService';
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { Button, Pagination, Table, Form, Container, Row, Col } from 'react-bootstrap';
import { logout, getEmployeesData } from '../services/authentication';

const PAGINATION_LIMIT = 10;
const pageLimits = [5, 10, 15, 20, 50];

const AdminComponent = () => {
  // const key = 'users';
  const [usersData, setUsersData] = useState([]);
  // const [gotoAddComponent, setGotoAddComponent] = useState(false);
  // const [emailIdForUpdate, setEmailIdForUpdate] = useState('');
  // const [deletedEmailId, setDeletedEmailID] = useState('');
  //const [showModal, setShowModal] = useState(false);
  const [goToLogin, setGoToLogin] = useState(false);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    getEmp(perPage, currentPage);
    console.log('called', total, perPage);
  }, [currentPage]);

  const getEmp = (perPage, currentPage) => {
    getEmployeesData(perPage, currentPage).then(response => {
      setTotal(response.data.total);
      setUsersData(response.data.data);
    }).catch(error => {
      console.log(error.response);
    });
  };

  const setPagination = () => {
    let items = [];
    for (let page = 1; page <= PAGINATION_LIMIT; page++) {
      items.push(
        <Pagination.Item key={page} onClick={() => setCurrentPage(page)}
          active={currentPage === page}>
          {page}
        </Pagination.Item>
      );
    }
    return items;
  };

  if (goToLogin || !getData('token')) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button onClick={() => {
              logout();
              setGoToLogin(true);
            }}> logOut </Button>
          </Col>
          {/* <Button onClick={() => setGotoAddComponent(true)}> Add </Button> */}
        </Row>
        <Row>
          <Table bordered hover variant='Danger' size='sm' className="mt-2">
            <thead>
              <tr>
                <th> id </th>
                <th>employee_name</th>
                <th>employee_ege</th>
                <th>employee_salary</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) =>
              (<tr key={index}>
                <td>{user.id}</td>
                <td>{user.employee_name}</td>
                <td>{user.employee_age} </td>
                <td>{user.employee_salary} </td>
                <td><Button variant='danger' size='sm' > Delete </Button>
                  <Button variant='success' size='sm'> update </Button>  </td>
              </tr>)
              )}

            </tbody>
          </Table>
          <ToastContainer />
        </Row>
        <Row>
          <Col xs="2">
            <Form.Select aria-label="Default select example"
              id="work"
              onChange={(e) => setPerPage(e.target.value)}
            >
              <option disabled>select page limit </option>
              {pageLimits.map((pageLimit) => (
                <option key={pageLimit}>{pageLimit}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />

              <Pagination.Ellipsis />
              <Pagination> {setPagination()}</Pagination>

              <Pagination.Ellipsis />
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
              <Pagination.Last onClick={() => setCurrentPage(PAGINATION_LIMIT)} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );

};

export default AdminComponent;