import React, { useState, useEffect } from 'react';
import { getData } from '../services/localStorageService';
const AdminComponent = () => {
  const key = 'users';
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const users = getData(key) || [];
    setUsersData(users.filter(user => user.roleName === 'user'));
  }, []);

  return (
    <>
      <div className="container">
        <h1>Simple Inventory Table</h1>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>Email_ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) =>
              (<tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.email_Id}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </div>
    </>
  );

};

export default AdminComponent;