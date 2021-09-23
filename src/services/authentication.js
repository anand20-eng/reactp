import { getData, setData } from './localStorageService';

export const registration = (user) => {
  const key = 'users';
  const users = getData(key) || [];

  if (users.find(record => record.email_Id === user.email_Id)) {
    return { success: false, message: 'emailId already exist' };
  }
  users.push(user);
  setData(key, users);
  return { success: true, message: 'registration successfully' };
};

export const login = (user) => {
  const key = 'users';
  const users = getData(key) || [];

  const match = users.find((match) => match.email_Id == user.email_Id);
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

  const userRecord = getUsers.find((item) => userData.email_Id === item.email_Id);
  if (userRecord.firstName === userData.firstName && userRecord.password === userData.password) {
    return { success: false, message: 'please change firstName or password' };
  }

  const updateUserData = getUsers.map((user) =>
    user.email_Id === userData.email_Id ? userData : user);

  setData(key, updateUserData);
  return { success: true, message: 'user updated' };
};
