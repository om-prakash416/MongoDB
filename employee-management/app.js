const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employeeDB',
    {
        // useNewUrlParser: true,
        
     })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Flash middleware
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// EJS setup
app.set('view engine', 'ejs');

// Routes
const employeeRoutes = require('./routes/employees');
app.use('/employees', employeeRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/employees');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
