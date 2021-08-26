import React from 'react';
import Login from './component/Login';
import Registration from './component/Registration';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
    </BrowserRouter>
  );
};

export default App;
