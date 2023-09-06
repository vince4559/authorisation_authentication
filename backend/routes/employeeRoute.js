const express = require('express');
const { getAllEmployee, createNewEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById } = require('../controllers/employeeController');
const verifyRoles = require('../middlewares/verifyRoles');
const Roles_List = require('../config/roles_list')
const employeeRouter = express.Router();


employeeRouter.get('/employees',verifyRoles(Roles_List.User,Roles_List.Admin), getAllEmployee);
employeeRouter.post('/createemployee',verifyRoles(Roles_List.Editor,Roles_List.Admin), createNewEmployee);
employeeRouter.get('/employee/:id', getEmployeeById);
employeeRouter.put('/employee/:id', updateEmployeeById);
employeeRouter.delete('/employee/:id', deleteEmployeeById);


module.exports= employeeRouter;