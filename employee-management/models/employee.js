const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    title: String,
    role: String
});

module.exports = mongoose.model('Employee', employeeSchema);
