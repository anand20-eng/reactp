/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { getData } from '../services/localStorageService';
import { update } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
const UpdateComponent = ({ match }) => {
  const key = 'users';
  const users = getData(key) || [];
  const [firstName, setFirstName] = useState('');
  const [email_Id, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [goToAdmin, setGoToAdmin] = useState(false);
  useEffect(() => {
    const update = users.find(u => u.email_Id == match.params.email_Id);
    setFirstName(update.firstName);
    setEmailId(update.email_Id);
    setPassword(update.password);

  }, []);

  const updateRecord = (userData) => {
    const response = update(userData);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.warn(response.message);
    }
  };


  if (goToAdmin) {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      <div>
        <form>
          <p align='center'> <button onClick={() => setGoToAdmin(true)} > back </button></p>
          <label> firstName: </label>

          <input type="text" value={firstName}
            onChange={e => setFirstName(e.target.value)} /> < br />

          <label> email_Id: </label>
          <input type="email" value={email_Id}
            onChange={e => setEmailId(e.target.value)} readOnly /> < br />

          <label htmlFor="">  password  :</label>
          <input type="password" value={password}
            onChange={e => setPassword(e.target.value)} /> <br />
          <button type='button' onClick={() =>
            updateRecord({ firstName, email_Id, password, roleName: 'user' })}> update</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );

};

export default UpdateComponent;
