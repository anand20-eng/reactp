import React from 'react';
import Login from './component/Login';
import Registration from './component/Registration';
import UserComponent from './component/UserComponent';
import AdminComponent from './component/AdminComponent';
import AddNewUser from './component/AddNewUser';
import UpdateComponent from './component/Update';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
//import { registration } from './services/authentication';

const App = () => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Registration" component={Registration} />
        <Route path="/user" component={UserComponent} />
        <Route path="/admin" component={AdminComponent} />
        <Route path= "/AddNewUser" component={AddNewUser} />
        <Route path= '/update/:email_Id' component= {UpdateComponent} />
      </Switch>
        
    </BrowserRouter>
  );
};

export default App;
