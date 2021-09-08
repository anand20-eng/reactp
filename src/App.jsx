import React from 'react';
import Login from './component/Login';
import Registration from './component/Registration';
import UserComponent from './component/UserComponent';
import AdminComponent from './component/AdminComponent';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path="/user" component={UserComponent} />
      <Route path="/admin" component={AdminComponent} />
    </BrowserRouter>
  );
};

export default App;
