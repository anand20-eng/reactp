import React from 'react';
import Login from './component/Login';
import Registration from './component/Registration';
import UserComponent from './component/UserComponent';
import AdminComponent from './component/AdminComponent';
import AddNewUser from './component/AddNewUser';
import UpdateComponent from './component/Update';
import Demo from './component/demo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Registration" component={Registration} />
          <Route path="/user" component={UserComponent} />
          <Route path="/admin/" component={AdminComponent} />
          <Route path="/AddNewUser" component={AddNewUser} />
          <Route path='/update/:id' component={UpdateComponent} />
          <Route path='/demo' component={Demo} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
