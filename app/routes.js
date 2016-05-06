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

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.json({
			error: "User not logged in"
		});
	}

};