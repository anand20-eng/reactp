
import React, { useState } from 'react';
import { registration } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router';
const AddNewUser = () => {
  const [firstName, setFirstName] = useState('');
  const [email_Id, setEmail_Id] = useState('');
  const [password, setPassword] = useState('');
  const [goToAdmin, setGoToAdmin] = useState(false);

  const handleClick = (user) => {
    const response = registration(user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  const reset = () => {
    setFirstName( '' );
    setEmail_Id('');
    setPassword('');
  };

  if (goToAdmin) {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      <div>
        <p align='center'> <button onClick={() => setGoToAdmin(true)} > back </button></p>
        <form >
          <label> firstName: </label>
          <input type="text" value={firstName}
            onChange={event => setFirstName(event.target.value)} /> <br />

          <label> email_id: </label>

          <input type="text" value={email_Id}
            onChange={event => setEmail_Id(event.target.value)} /> < br />

          <label> password: </label>

          <input type="password" value={password}
            onChange={event => setPassword(event.target.value)} /> <br />

          <button type='button' disabled={!email_Id} onClick={() =>
            handleClick({ firstName, email_Id, password, roleName: 'user' })} >
            addNewUser </button>
          {/* <Link to='/'> Back to Login </Link> */}
          <button type="button" onClick={reset}> reset </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );

};

export default AddNewUser;
