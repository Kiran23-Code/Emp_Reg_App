const express = require('express');
const { 
    getEmployees,  
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require('../controllers/employeeController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // For handling file uploads
const router = express.Router();

// route to get all employees
router.get('/', getEmployees);

router.post('/', upload.single('image'), createEmployee);

router.put('/:id', upload.single('image'), updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;
