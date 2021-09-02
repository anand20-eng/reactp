
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/authentication';

const Login = () => {

  const [email_Id, setEmail_Id] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    login({ email_Id, password });

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
