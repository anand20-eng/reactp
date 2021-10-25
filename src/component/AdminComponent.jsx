import React, { useState, useEffect } from 'react';
import { getData, } from '../services/localStorageService';
import { logout } from '../services/authentication';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Pagination, Table, Form, Container, Row, Col, Modal, InputGroup, FormControl, Image } from 'react-bootstrap';
import { getEmployeesData, deleteEmployeeData, } from '../services/employee';

const PAGINATION_LIMIT = 10;
const pageLimits = [5, 10, 15, 20, 50];

const AdminComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [gotoAddComponent, setGotoAddComponent] = useState(false);
  const [idForUpdate, setIdForUpdate] = useState('');
  const [goToLogin, setGoToLogin] = useState(false);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pages, setPages] = useState([]);
  const [modalShow, setModalShow] = useState('');
  const [deleteEmpId, setDeleteEmpId] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    configurePagination(currentPage, perPage);
  }, [total]);

  useEffect(() => {
    getEmp(perPage, currentPage, search);
  }, [currentPage, perPage, search]);

  const getEmp = (perPage, currentPage, searchQuery) => {
    getEmployeesData(perPage, currentPage, searchQuery).then(response => {
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

  const deleteEmpRecord = (deleteEmpId) => {
    deleteEmployeeData(deleteEmpId).then(response => {
      toast.success(response.data.message);
      getEmp(perPage, currentPage);
    }).catch(error => {
      toast.error(error.message);
    });

  };
  if (goToLogin || !getData('token')) {
    return <Redirect to="/" />;
  }

  if (idForUpdate) {
    return <Redirect to={{ pathname: `/update/${idForUpdate}` }} />;
  }
  if (gotoAddComponent) {
    return <Redirect to='/AddNewUser' />;
  }
  return (
    <>
      <Container>
        <Row className="mt-2">
          <Col>
            <Button onClick={() => {
              logout();
              setGoToLogin(true);
            }}> logOut </Button>
          </Col>
          <Col>
            <Button onClick={() => setGotoAddComponent(true)} size='sm' > Add </Button>
          </Col>
          <Col xs={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@ </InputGroup.Text>
              <FormControl
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

          </Col>
        </Row>
        <Row>
          <Table bordered hover variant='Danger' size='sm'>
            <thead>
              <tr>
                <th> id </th>
                <th>icon</th>
                <th>employee_name</th>
                <th>employee_ege</th>
                <th>employee_salary</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((employee, index) =>
              (<tr key={index}>
                <td>{employee.id} </td>
                <td>
                  {employee.profile_image && <Image src={employee.profile_image} roundedCircle className="employee-profile" />}
                </td>
                <td>{employee.employee_name}</td>
                <td>{employee.employee_age} </td>
                <td>{employee.employee_salary} </td>
                <td><Button type='button' variant='danger' size='sm'
                  onClick={() => {
                    setDeleteEmpId(employee.id);
                    setModalShow(true);
                  }}> Delete </Button>
                  <Button variant='success' size='sm'
                    onClick={() => {
                      setIdForUpdate(employee.id);
                    }}> update </Button>
                </td>
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
                configurePagination(currentPage + 1, perPage)}
                disabled={(currentPage == lastPage)} />
              <Pagination.Last onClick={() => configurePagination(lastPage, perPage)}
                disabled={currentPage === lastPage} />
            </Pagination>
          </Col>
        </Row>
        <Modal show={modalShow}
          size="sm"
          backdrop="static"
          animation={false}
          onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body> are you sure? you want to  delete this record {deleteEmpId}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger"
              onClick={() => {
                deleteEmpRecord(deleteEmpId);
                setModalShow(false);
              }}>
              Yes
            </Button>
            <Button variant="primary" onClick={() => setModalShow(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );

};

export default AdminComponent;