
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../services/authentication';

const Login = () => {
  const [email_Id, setEmail_Id] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('');

  const handleClick = () => {
    const response = login({ email_Id, password });
    if (response.success) {
      toast.success(response.message);
      setRoleName(response.roleName);
    } else {
      toast.error(response.message, { position : 'top-center' });
    }
  };

  if (roleName === 'user') {
    return <Redirect to="/user" />;
  }

  if (roleName === 'admin') {
    return <Redirect to="/admin" />;
  }

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
      <ToastContainer />
    </div>
  );
};

export default Login;
