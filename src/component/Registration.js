import React from "react";
import {Link} from "react-router-dom";
class Registration extends React.Component {
  render() {
    return (
      // <table> <tr> <td> Email Address: </td> <td> <input type= "text" > </td> </tr>   </table>
      <form>
        <label>
          Name:
          <input type='text' placeholder='Enter Username' name='name' /> <br />
        </label>
        <label>
          password:
          <input type='text' placeholder='Enter password' value='password' />
          <br />
          DOB:
          <input type='text' placeholder='DOB' />
          <br />
        </label>
        <button type='submit'> add user </button>
        <Link to='/'> Back to Login </Link>
      </form>
    );
  }
}

export default Registration;
