import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import { registration } from '../services/authentication';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [email_Id, setemail_Id] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const response = registration({ firstName, email_Id, password });
    console.log(response);
    if (response.success) {
      console.log(response.message);
    } else {  
      console.error(response.message);
    }
  };

  return (
    // <table> <tr> <td> Email Address: </td> <td> <input type= "text" > </td> </tr>   </table>
    <form >
      <label> fristName: </label>
      <input type="text" value={firstName}
        onChange={event => setFirstName(event.target.value)} /> <br />

      <label> email_id: </label>

      <input type="text" value={email_Id}
        onChange={event => setemail_Id(event.target.value)} /> < br />

      <label> password: </label>

      <input type="password" value={password}
        onChange={event => setPassword(event.target.value)} /> <br />

      <button type='button' onClick={handleClick}> add user </button>

      <Link to='/'> Back to Login </Link>

    </form>
  );
};

export default Registration;









