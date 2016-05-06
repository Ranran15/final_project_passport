var LocalStrategy = require('passport-local').Strategy;
var studentUser = require('../app/models/studentUser');
var instructorUser = require('../app/models/instructorUser');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		//done(null, user.id);
		var key = {
			id: user.id,
			type: user.accountType
		}
		done(null, key);
	});

	passport.deserializeUser(function(key, done) {
		if(key.type ==='student'){
			studentUser.findById(key.id, function(err, user) {
				done(err, user);
			});
		}else{
			instructorUser.findById(key.id, function(err, user) {
				done(err, user);
			});
		}

	});

	passport.use('student-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
	},
	function(email, password, done) {
		studentUser.findOne({'local.email' : email}, function(err, user) {
			if(err)
				return done(err);
			if(user) {
				return done(null, false);
			} else {
				var newUser = new studentUser();
				
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				newUser.accountType='student';
				newUser.save(function(err) {
					if(err)
						throw err;
					return done(null, newUser);
				});
			}
			
		});
	}));

	passport.use('instructor-signup', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
		},
		function(email, password, done) {
			instructorUser.findOne({'local.email' : email}, function(err, user) {
				if(err)
					return done(err);
				if(user) {
					return done(null, false);
				} else {
					var newUser = new instructorUser();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.accountType='instructor';
					newUser.save(function(err) {
						if(err)
							throw err;
						return done(null, newUser);
					});
				}

			});
		}));

	passport.use('student-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	},
	function(email, password, done) {
		studentUser.findOne({'local.email': email}, function(err, user) {
			if(err)
				return done(err);
			if(!user)
				return done(null, false);
			if(!user.validPassword(password))
				return done(null, false);
			return done(null, user);

		});
	}));

	passport.use('instructor-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
		},
		function(email, password, done) {
			instructorUser.findOne({'local.email': email}, function(err, user) {
				if(err)
					return done(err);
				if(!user)
					return done(null, false);
				if(!user.validPassword(password))
					return done(null, false);
				return done(null, user);

			});
		}));

};
