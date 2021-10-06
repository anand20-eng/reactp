import React, { useState, useEffect } from 'react';
import { getData, setData } from '../services/localStorageService';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Table } from 'react-bootstrap';

const AdminComponent = () => {
  const key = 'users';
  const [usersData, setUsersData] = useState([]);
  const [gotoAddComponent, setGotoAddComponent] = useState(false);
  const [emailIdForUpdate, setEmailIdForUpdate] = useState('');
  const [deletedEmailId, setDeletedEmailID] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    showUsers();
  }, []);

  const getAllUserData = () => getData(key) || [];

  const showUsers = () => {
    const allUsers = getAllUserData();
    setUsersData(allUsers.filter((user) => user.roleName === 'user'));
  };

  const deleteRecord = () => {
    const allUsers = getAllUserData();
    const deleteUserData = allUsers.filter(dUser => dUser.emailId !== deletedEmailId);
    setData(key, deleteUserData);
    showUsers();
    toast.success('Record is deleted');
    setShowModal(false);
  };

  if (gotoAddComponent) {
    return <Redirect to='/AddNewUser' />;
  }

  if (emailIdForUpdate) {
    return <Redirect to={{ pathname: `/update/${emailIdForUpdate}` }}
    />;
  }

  return (
    <>
      <div className="container">

        <Button onClick={() => setGotoAddComponent(true)}> Add </Button>
        <Table striped bordered hover variant='Danger' size='sm'>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>EmailID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) =>
            (<tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.emailId}</td>
              <td>
                <Button variant='success' size='sm'
                  onClick={() => setEmailIdForUpdate(user.emailId)}> update </Button>
                <Button className='ml-4' size='sm'
                  variant="danger" onClick={() => {
                    setDeletedEmailID(user.emailId);
                    setShowModal(true);
                  }}>
                  delete
                </Button>
                <Modal show={showModal} onHide={() => setShowModal(false)}
                  backdrop="static">
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Record</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>are you sure delete this Record </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteRecord()}>
                      yes
                    </Button>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                      No
                    </Button>
                  </Modal.Footer>
                </Modal>

              </td>
            </tr>)
            )}

          </tbody>
        </Table>
        <ToastContainer />
      </div>
    </>
  );

};

export default AdminComponent;