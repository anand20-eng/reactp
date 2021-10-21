import axios from 'axios';
import { getData, setData, remove } from './localStorageService';

export const registration = (user) => {
  return axios.post('http://localhost:4000/users/register', {
    email: user.email, password: user.password, roleName: user.roleName
  });
};

export const login = (credential) => {
  return axios.post('http://localhost:4000/users/authenticate', { email: credential.emailId, password: credential.password });
};

export const validate = (token) => {
  return axios.get('http://localhost:4000/users/validate', { headers: { token } });
};

export const update = (userData) => {
  const key = 'users';
  const getUsers = getData(key) || [];

  const userRecord = getUsers.find((item) => userData.emailId === item.emailId);
  if (userRecord.firstName === userData.firstName && userRecord.password === userData.password) {
    return { success: false, message: 'please change firstName or password' };
  }

  const updateUserData = getUsers.map((user) =>
    user.emailId === userData.emailId ? userData : user);

  setData(key, updateUserData);
  return { success: true, message: 'user updated' };
};

export const logout = () => {
  remove('token');
};
