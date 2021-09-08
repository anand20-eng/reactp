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
