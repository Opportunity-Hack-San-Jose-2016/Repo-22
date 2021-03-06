var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

mongoose.connect('mongodb://localhost/medair');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.all(expressJWT({ secret: 'App Secret String'}). unless({ path: ['/users/login']}));

require('./app/routes/refugee')(app);
require('./app/routes/organization')(app);
require('./app/routes/volunteer')(app);
require('./app/routes/serviceRegistration')(app);
require('./app/routes/organization')(app);
require('./app/routes/serviceRequests')(app);


app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

// app.get('*', function(req, res, next) {
//   var err = new Error();
//   err.status = 404;
//   next(err);
// });

// app.post('*', function(req, res, next) {
//   var err = new Error();
//   err.status = 404;
//   next(err);
// });

module.exports = app;