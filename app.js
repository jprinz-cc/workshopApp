var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000", "https://two500workshopreact.onrender.com/"],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
