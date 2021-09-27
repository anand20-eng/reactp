import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registration } from '../services/authentication';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Row, Col, Container, Dropdown } from 'react-bootstrap';
const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [email_Id, setEmail_Id] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('user');
  console.log(roleName);

  const handleClick = (user) => {
    const response = registration(user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Form>
        <Container className="mt-2">
          <Dropdown onSelect={(event) => {
            console.log(event);
          }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" >
              userRole
            </Dropdown.Toggle>

            <Dropdown.Menu value={roleName}
              onSelect={(event) => setRoleName(event.target.value)}>

              <Dropdown.Item value='user' eventKey="user">user</Dropdown.Item>
              <Dropdown.Item value='admin' eventKey="admin">admin</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          <Row>
            <Col sm='6'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>firstName</Form.Label>
                <Form.Control type="text" placeholder="Enter firstName" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email_Id}
                  onChange={(e) => setEmail_Id(e.target.value)} />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm='6'>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit"
            onClick={() => handleClick({ firstName, email_Id, password, roleName })} >
            Submit
          </Button>
          <Link to="/"> New User </Link>
        </Container>
      </Form>
      <ToastContainer />

      {/* <table> <tr> <td> Email Address: </td> <td> <input type= "text" > </td> </tr>   </table>
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

      </form> */}

    </>
  );
};

export default Registration;









