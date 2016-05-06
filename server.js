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

var router = express.Router();

mongoose.connect(configDB.url);
//mongoose.connect(configDB.url,function(){
	/* Drop the DB */
//	mongoose.connection.db.dropDatabase();
//}); // db connection
require('./config/passport')(passport);



//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	next();
};
app.use(allowCrossDomain);


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
