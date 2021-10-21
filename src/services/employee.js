
import axios from 'axios';

export const getEmployeesData = (perPage, currentPage) => {
    return axios.get(`http://localhost:4000/employees?perPage=
    ${perPage}&currentPage=${currentPage}`);
  };
  export const addEmployee = (employees) => {
      console.log(employees);
    return axios.post('http://localhost:4000/employees/',
      { employee_name: employees.employee_name, employee_age: employees.employee_age,
        employee_salary: employees.employee_salary
     } );
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