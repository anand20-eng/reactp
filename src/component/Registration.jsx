import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import { registration } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';
const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [email_Id, setemail_Id] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('user');

  const handleClick = (user) => {
    const response = registration(user);
    console.log(response);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>

      {/* <table> <tr> <td> Email Address: </td> <td> <input type= "text" > </td> </tr>   </table> */}
      <form >
        <select name="userRoll" id="work" value={roleName} onChange={(event) =>
          setRoleName(event.target.value)} >
          <option disabled>select your Roll </option>
          <option value='user'> User </option>
          <option value='admin'> Admin </option>
        </select> <br />

        <label> firstName: </label>   
        <input type="text" value={firstName}
          onChange={event => setFirstName(event.target.value)} /> <br />

        <label> email_id: </label>

        <input type="text" value={email_Id}
          onChange={event => setemail_Id(event.target.value)} /> < br />

        <label> password: </label>

        <input type="password" value={password}
          onChange={event => setPassword(event.target.value)} /> <br />

        <button type='button' onClick={() => handleClick({ firstName, email_Id, password, roleName })}> add user </button>
        <Link to='/'> Back to Login </Link>

      </form>
      <ToastContainer />
    </>
  );
};

export default Registration;









