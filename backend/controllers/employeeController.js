const employeeModel = require('../model/Employee_model');

exports.getAllEmployee = async (req, res) => {
    let employees;
    try {
        employees = await employeeModel.find();
    } catch (err) {
        console.log(err)
    };
    if(!employees){
        return res.status(404).json({'message':'No employee found'});
    }
    return res.status(200).json({employees});
};

exports.createNewEmployee = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({'message':'username and password is required'})

    let employee;
    try {
        employee = await employeeModel.create({username, password});
    } catch (err) {
        console.log(err)
    };

    if(!employee){
        return res.status(404).json({'message':'No employee found'});
    }
    return res.status(201).json({employee});
};

exports.getEmployeeById = async (req, res) => {
    let employee;
    const id = req.params.id;

    try {
        employee = await employeeModel.findById(id);
    } catch (err) {
        console.log(err);
    };
    if(!employee){
        return res.status(404).json({'message':'ID does not match any employee'});
    }
    return res.status(200).json({employee});
};


exports.updateEmployeeById = async (req, res) => {
    const id = req.params.id;
    const {username, password} = req.body;

    let employee;
    try {
        employee = await employeeModel.findByIdAndUpdate(id,{username, password});
    } catch (err) {
        console.log(err)
    };

    if(!employee){
        return res.status(404).json({'message':'ID does not match any employee'});
    }
    return res.status(200).json({employee});
};

exports.deleteEmployeeById = async (req, res) => {
    let employee;
    const id = req.params.id;
   try {
    employee = await employeeModel.findByIdAndDelete(id);
   } catch (err) {
    console.log(err)
   };

    if(!employee){
        return res.status(404).json({'message':'ID doest match any employee'});
    }
    return res.status(200).json({employee});
}
