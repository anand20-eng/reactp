import { getData, setData } from './localStorageService';

export const registration = (user) => {
  const key = 'users';
  const users = getData(key) || [];
  if (users.find(record => record.emailId === user.emailId)) {
    return { success: false, message: 'emailId already exist' };
  }
  users.push(user);
  setData(key, users);
  return { success: true, message: 'registration successfully' };
};

export const login = (user) => {
  const key = 'users';
  const users = getData(key) || [];

  const match = users.find((match) => match.emailId == user.emailId);
  if (match) {
    if (match.password == user.password) {
      return { success: true, message: 'login is successful', roleName: match.roleName };
    }
    else {
      return { success: false, message: 'password is incorrect' };
    }
  }
  else {
    return { success: false, message: 'emailId is incorrect' };

  }
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
