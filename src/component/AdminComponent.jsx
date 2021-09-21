import React, { useState, useEffect } from 'react';
import { getData, setData } from '../services/localStorageService';
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const AdminComponent = () => {
  const key = 'users';
  const getUsersData = getData(key) || [];
  const [usersData, setUsersData] = useState([]);
  const [gotoAddComponent, setGotoAddComponent] = useState(false);
  const [emailIdForUpdate, setEmailIdForUpdate] = useState('');

  console.log(usersData);
  useEffect(() => {
    showUsers();
  }, []);
  //console.log(showUsers());

  const showUsers = () => {
    setUsersData(getUsersData.filter((user) => user.roleName === 'user'));
  };

  const deleteRecord = (email_Id) => {

    const deleteUserData = getUsersData.filter(dUser => dUser.email_Id !== email_Id);
    console.log(deleteUserData);
    setData(key, deleteUserData);
    showUsers(deleteUserData);
    //toast.success('Record is deleted');
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
        <h1>Simple Inventory Table</h1>
        <button onClick={() => setGotoAddComponent(true)}> Add </button>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>Email_ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) =>
              (<tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.email_Id}</td>
                <td><button onClick={() => deleteRecord(user.email_Id)}> Delete </button>
                  <button onClick={() => setEmailIdForUpdate(user.email_Id)}> update </button>  </td>
              </tr>)
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );

};

export default AdminComponent;