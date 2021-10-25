import axios from 'axios';

export const getEmployeesData = (perPage, currentPage, search) => {
  return axios.get(`http://localhost:4000/employees?perPage=${perPage}&currentPage=${currentPage}&search=${search}`);
};

export const addEmployee = (employees) => {
  return axios.post('http://localhost:4000/employees/', employees
  );
};

export const getEmployeeById = (employeeId) => {
  return axios.get(`http://localhost:4000/employees/${employeeId}`);
};

export const deleteEmployeeData = (employeeId) => {
  return axios.delete(`http://localhost:4000/employees/${employeeId}`);
};

export const updateEmployeeData = (userId, user) => {
  return axios.put(`http://localhost:4000/employees/${userId}`, user);
};

export const uploadProfile = (employeeId, file) => {
  return axios.post(`http://localhost:4000/employees/upload/${employeeId}`, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

