import React, { useState, useEffect } from 'react';
import { getData, setData } from '../services/localStorageService';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const AdminComponent = () => {
  const key = 'users';
  const [usersData, setUsersData] = useState([]);
  const [gotoAddComponent, setGotoAddComponent] = useState(false);
  const [emailIdForUpdate, setEmailIdForUpdate] = useState('');

  useEffect(() => {
    showUsers();
  }, []);

  const getAllUserData = () => getData(key) || [];

  const showUsers = () => {
    const allUsers = getAllUserData();
    setUsersData(allUsers.filter((user) => user.roleName === 'user'));
  };

  const deleteRecord = (emailId) => {
    const allUsers = getAllUserData();
    const deleteUserData = allUsers.filter(dUser => dUser.emailId !== emailId);
    setData(key, deleteUserData);
    showUsers();
    toast.success('Record is deleted');
  };

  if (gotoAddComponent) {
    return <Redirect to='/AddNewUser' />;
  }

  if (emailIdForUpdate) {
    return <Redirect to={{ pathname: `/update/${emailIdForUpdate}` }}
    />;
  }
  // if (backToLogin) {
  //   return <Redirect to='/'  />; 
    
  // }
  return (
    <>
      <div className="container">
        <h1>Simple Inventory Table  </h1>
        {/* <p algin='left'><Button onClick={()=> setBackToLogin(true)}>  */}
        {/* BackLogin</Button > </p> */}
        <Button onClick={() => setGotoAddComponent(true)}> Add </Button>
        <Table striped bordered hover variant='Danger' size = 'sm'>
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
                <td><Button variant='success' size='sm' onClick={() => deleteRecord(user.emailId)}> Delete </Button>
                  <Button variant='success' size='sm'onClick={() => setEmailIdForUpdate(user.emailId)}> update </Button>  </td>
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