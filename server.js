var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Get the App credentials from the environmental variables:
require('dotenv').config();


var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(morgan('combined'));
app.use(bodyParser.json());


// GET /
//   The index page will show either the login-with-telegram button, or display the
//   logged in user info.
app.get('/', function (req, res) {
    res.render('index', { user: req.user, errors: false, authUrl: process.env.AUTH_URL });
});

app.get('/auth', function (req, res) {
    res.render('index', { user: req.user, errors: false });
});

// GET /logout
//   Logging out the user.
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(3000);