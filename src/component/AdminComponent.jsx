import React, { useState, useEffect } from 'react';
import { getData, } from '../services/localStorageService';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Pagination, Table, Form, Container, Row, Col, } from 'react-bootstrap';
import { logout, getEmployeesData, deleteEmployeeData } from '../services/authentication';

const PAGINATION_LIMIT = 10;
// const PAGINATION_LIMIT2 = 20;
const pageLimits = [5, 10, 15, 20, 50];

const AdminComponent = () => {
  const [usersData, setUsersData] = useState([]);
  // const [gotoAddComponent, setGotoAddComponent] = useState(false);
  const [idForUpdate, setIdForUpdate] = useState('');
  //const [showModal, setShowModal] = useState(false);
  const [goToLogin, setGoToLogin] = useState(false);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    configurePagination(currentPage, perPage);
  }, [total]);

  useEffect(() => {
    getEmp(perPage, currentPage);
  }, [currentPage, perPage]);

  const getEmp = (perPage, currentPage) => {
    getEmployeesData(perPage, currentPage).then(response => {
      setTotal(response.data.total);
      setUsersData(response.data.data);
    }).catch(error => {
      toast.error(error.message);
    });
  };

  const configurePagination = (pageNumber, latestPerPage) => {
    let items = [];
    const maxPageNumber = Math.ceil(total / latestPerPage);
    const result = Math.floor((pageNumber - 1) / PAGINATION_LIMIT);
    const start = (result * PAGINATION_LIMIT) + 1;
    let end = start + (PAGINATION_LIMIT - 1);

    if (end > maxPageNumber) {
      end = maxPageNumber;
    }
    for (let page = start; page <= end; page++) {
      items.push(page);
    }
    setCurrentPage(pageNumber);
    setPages(items);
    setLastPage(maxPageNumber);
  };

  const deleteEmpId = (id) => {
    deleteEmployeeData(id).then(response => {
      console.log(response);
    }).catch(error=>{
      console.log(error.message);
    });
    const getData = usersData;
    const empIdDelete = getData.filter(emp => emp.id !== id);
    setUsersData(empIdDelete);
  };
  if (goToLogin || !getData('token')) {
    return <Redirect to="/" />;
  }

  if (idForUpdate) {
    return <Redirect to={{ pathname: `/update/${idForUpdate}` }} />;
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
                <td><Button variant='danger' size='sm'
                  onClick={() => deleteEmpId(user.id)}> Delete </Button>
                  <Button variant='success' size='sm'
                    onClick={() => setIdForUpdate(user.id)}> update </Button>  </td>
              </tr>)
              )}

            </tbody>
          </Table>
        </Row>
        <Row>
          <Col xs="2">
            <Form.Select aria-label="Default select example"
              id="work"
              onChange={(e) => {
                setPerPage(e.target.value);
                configurePagination(1, e.target.value);
              }}
              value={perPage}
            >
              <option disabled>select page limit </option>
              {pageLimits.map((pageLimit) => (
                <option key={pageLimit}>{pageLimit}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Pagination>
              <Pagination.First onClick={() => configurePagination(1, perPage)}
                disabled={currentPage === 1} />
              <Pagination.Prev
                onClick={() => configurePagination(currentPage - 1, perPage)}
                disabled={currentPage === 1} />

              <Pagination> {pages.map((page) => (
                <Pagination.Item key={page}
                  onClick={() => configurePagination(page, perPage)}
                  active={currentPage === page}>
                  {page}
                </Pagination.Item>
              ))}</Pagination>

              <Pagination.Next onClick={() =>
                configurePagination(currentPage + 10, perPage)}
                disabled={(currentPage == 21 && lastPage == 27)} />
              <Pagination.Last onClick={() => configurePagination(lastPage, perPage)}
                disabled={currentPage === lastPage} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );

};

export default AdminComponent;