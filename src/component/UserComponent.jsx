import React from 'react';
import { Redirect } from 'react-router';
import { getData } from '../services/localStorageService';

const UserComponent = () => {

  if (!getData('token')) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <h1> User  page </h1>
      </div>
    </>
  );

};

export default UserComponent;
