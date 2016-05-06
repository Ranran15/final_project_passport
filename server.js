var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	configDB = require('./config/database.js');

mongoose.connect(configDB.url); // db connection
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'passport demo' }));
app.use(express.static(__dirname + '/frontend'));


app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port ' + port);