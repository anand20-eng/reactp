
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [email_Id, setEmail_Id] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(function (user) {
      return email_Id == user.email_Id;
    });

    if (user) {
      if (user.password == password) {
        console.log('Welcome ' + user.firstName);
      } else {
        console.log('password is incorrect');
      }
    } else {
      console.log('emailId is not correct');
    }

  };


  return (
    <div>
      <form className="container">

        <label> Email_ID: </label>

        <input type='email' value={email_Id}
          onChange={event => setEmail_Id(event.target.value)} /> <br />

        <label> password</label> :
        <input
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <br />

        <button type='Button' onClick={handleClick}> Sign </button>

        <Link to="/Registration"> New User </Link>
      </form>
    </div>
  );
};

export default Login;
