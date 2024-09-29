const Employee = require('../models/employee');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.createEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
        const employee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image: req.file ? req.file.path : null, 
        });
        await employee.save();
        res.status(201).send('Employee created successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.updateEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');

        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.mobile = mobile || employee.mobile;
        employee.designation = designation || employee.designation;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;

        if (req.file) {
            employee.image = req.file.path; 
        }

        await employee.save();
        res.status(200).send('Employee updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');

        await employee.remove();
        res.status(200).send('Employee deleted successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};
