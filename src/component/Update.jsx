/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { getData } from '../services/localStorageService';
import { registration } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';
const UpdateComponent = ({ match }) => {
  const key = 'users';
  const users = getData(key) || [];
  const [firstName, setFirstName] = useState('');
  const [email_Id, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const update = users.find(u => u.email_Id == match.params.email_Id);
    setFirstName(update.firstName);
    setEmailId(update.email_Id);
    setPassword(update.password);
   
  }, []);

  const updateRecord = (user) => {
    const response = registration(user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div>
        <form>
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
            updateRecord({ firstName, email_Id, password })}> update</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );

};

export default UpdateComponent;
