import React from "react";
 import  { Link } from 'react-router-dom';
class Login extends React.Component {
  render() {
    return (
       <div>
      <form className="continer">
    
        <label>
          Name:
          <input type='text' placeholder='Enter Username' name='name' /> <br />
        </label>
        <label>
          password:
          <input
            type='text'
            placeholder='Enter password'
            value='password'
          />
          <br />
        </label>
        <button type='submit'> Sign </button>
        <Link to = "/Registration"> New User </Link>
       
        
      </form> 
      </div>
    );
  }
}

export default Login;
