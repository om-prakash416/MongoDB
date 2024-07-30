const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Show all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.render('index', { employees });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Show form to add a new employee
router.get('/new', (req, res) => {
    res.render('employee', { employee: {}, action: '/employees', method: 'POST', button: 'Add Employee' });
});

// Add a new employee
router.post('/', async (req, res) => {
    const { name, email, mobile, title, role } = req.body;
    const employee = new Employee({ name, email, mobile, title, role });

    try {
        await employee.save();
        req.flash('success_msg', 'Employee added successfully');
        res.redirect('/employees');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Show form to edit an employee
router.get('/edit/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render('employee', { employee, action: `/employees/${employee._id}`, method: 'POST', button: 'Update Employee' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Edit an employee
router.post('/:id', async (req, res) => {
    const { name, email, mobile, title, role } = req.body;

    try {
        await Employee.findByIdAndUpdate(req.params.id, { name, email, mobile, title, role });
        req.flash('success_msg', 'Employee updated successfully');
        res.redirect('/employees');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete an employee
router.post('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Employee deleted successfully');
        res.redirect('/employees');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
