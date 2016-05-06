var studentUser = require('./models/studentUser');
var instructorUser = require('./models/instructorUser');
module.exports = function(app, passport) {

	/*app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.redirect('/profile.html');
	});*/
	app.post('/signup', function(req, res) {
		if(req.body.accountType == 'student'){
			passport.authenticate('student-signup')(req, res, function () {
				res.redirect('/profile.html');
			});
		}else{
			passport.authenticate('instructor-signup')(req, res, function () {
				res.redirect('/profile.html');
			});
		}
	});

	/*app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.redirect('/profile.html');
	});*/
	app.post('/login', function(req, res) {
		if(req.body.accountType == 'student'){
			passport.authenticate('student-login')(req, res, function () {
				res.redirect('/profile.html');
			});
		}else{
			passport.authenticate('instructor-login')(req, res, function () {
				res.redirect('/profile.html');
			});
		}
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});




	app.delete('/profile',isLoggedIn,function(req, res) {
		if(req.user.accountType==='student'){
			studentUser.remove({_id: req.params.id}, function(err,user){
				if(err){
					res.status(500).send({message: "Server error", data: []});
				}else if(user ==undefined||user==null||user.result.n === 0){
					res.status(404).send({message: "User not found", data: []});
				}
				else{
					res.status(200).json({message: "OK", data: [] });
				}
			});
		}else{
			instructorUser.remove({_id: req.params.id}, function(err,user){
				if(err){
					res.status(500).send({message: "Server error", data: []});
				}else if(user ==undefined||user==null||user.result.n === 0){
					res.status(404).send({message: "User not found", data: []});
				}
				else{
					res.status(200).json({message: "OK", data: [] });
				}
			});
		}
	});



	app.put('/profile',isLoggedIn, function(req,res){
		var user = req.user;
		if(user.accountType==='student'){
			user.name = req.body.name;
			user.courseList = req.body.courseList;
			user.courseTaskList = req.body.courseTaskList;
			user.personalTaskList = req.body.personalTaskList;
			user.todoList = req.body.todoList;

			user.save(function(err) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({
						data: user, message: "User has been updated!"
					});
				}
			});
		}else{
			user.name = req.body.name;
			user.courseid = req.body.courseid;

			user.save(function(err) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({
						data: user, message: "User has been updated!"
					});
				}
			});
		}

	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.json({
			error: "User not logged in"
		});
	}

};