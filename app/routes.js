var studentUser = require('./models/studentUser');
var instructorUser = require('./models/instructorUser');
var Course = require('./models/Course');
var courseTask = require('./models/courseTask');
var personalTask = require('./models/personalTask');
var todo = require('./models/todo');

module.exports = function(app, passport) {

	/*app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.redirect('/profile.html');
	});*/


	/*app.get('/',function(req, res) {
		res.redirect('/backup.html');
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
			studentUser.remove({_id: req.user.id}, function(err,user){
				if(err){
					res.status(500).send({message: "Server error", data: []});
				}else if(user ==undefined||user==null){
					res.status(404).send({message: "User not found", data: []});
				}
				else{
					res.status(200).json({message: "OK", data: [] });
				}
			});
		}else{
			instructorUser.remove({_id: req.user.id}, function(err,user){
				if(err){
					res.status(500).send({message: "Server error", data: []});
				}else if(user ==undefined||user==null){
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



	//courses
	app.post('/courses', function(req, res) {
		var course = new Course();

		course.name = req.body.name;
		course.description = req.body.description||"";
		course.homepage = req.body.homepage;
		course.instructorid = req.body.instructorid;
		course.instructorName = req.body.instructorName;
		course.courseTaskList = req.body.courseTaskList||[];
		course.studentList = req.body.studentList||[];

		course.save(function(err){
			if (err) {
				res.status(500).json({ message: "Server error", data: err });
			} else {
				res.status(201).json({message: "OK", data: course});
			}
		});
	});


	app.get('/courses', function(req, res) {
		var where = req.query.where ? JSON.parse(req.query.where) : {},
			sort = eval("("+req.query.sort+")"),
			select = req.query.select ? JSON.parse(req.query.select) : {},
			skip = req.query.skip || 0,
			limit = req.query.limit ? JSON.parse(req.query.limit) : 0,
			count = (req.query.count === "true") || false;

		console.log("sort"+JSON.stringify(sort)+" where:"+ JSON.stringify(where));
		if (count) {
			Course.find(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(err, courses) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({ message: "OK", data: courses });
				}
			});
		} else {
			console.log("not count");
			Course.find(where).sort(sort).select(select).skip(skip).limit(limit).exec(function (err, courses) {
				console.log("In execute");
				if(courses.length==0){
					res.status(200).json({message: "OK", data: []});
				}else{
					if (err) {
						res.status(500).json({message: "Server error", data: err});
					} else {
						res.status(200).json({message: "OK", data: courses});
					}
				}
			});
		}
	});




	app.post('/courseTasks', function(req, res) {
		var task = new courseTask();

		task.courseid = req.body.courseid;
		task.name = req.body.name;
		task.description = req.body.description||"";
		task.courseName = req.body.courseName;
		task.releaseDate = req.body.releaseDate;
		task.dueDate = req.body.dueDate;

		task.save(function(err){
			if (err) {
				res.status(500).json({ message: "Server error", data: err });
			} else {
				res.status(201).json({message: "OK", data: task});
			}
		});
	});

	app.get('/courseTasks', function(req, res) {
		var where = req.query.where ? JSON.parse(req.query.where) : {},
			sort = eval("("+req.query.sort+")"),
			select = req.query.select ? JSON.parse(req.query.select) : {},
			skip = req.query.skip || 0,
			limit = req.query.limit ? JSON.parse(req.query.limit) : 0,
			count = (req.query.count === "true") || false;

		console.log("sort"+JSON.stringify(sort)+" where:"+ JSON.stringify(where));
		if (count) {
			courseTask.find(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(err, tasks) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({ message: "OK", data: tasks });
				}
			});
		} else {
			console.log("not count");
			courseTask.find(where).sort(sort).select(select).skip(skip).limit(limit).exec(function (err, tasks) {
				console.log("In execute");
				//if(tasks.length==0){
				res.status(200).json({message: "OK", data: []});
				// }else{
				if (err) {
					res.status(500).json({message: "Server error", data: err});
				} else {
					res.status(200).json({message: "OK", data: tasks});
					//   }
				}
			});
		}
	});



	app.post('/personalTasks', function(req, res) {
		var task = new personalTask();
		task.userid = req.body.userid;
		task.courseid = req.body.courseid;
		task.name = req.body.name;
		task.description = req.body.description||"";
		task.courseName = req.body.courseName;
		task.releaseDate = req.body.releaseDate;
		task.dueDate = req.body.dueDate;

		task.save(function(err){
			if (err) {
				res.status(500).json({ message: "Server error", data: err });
			} else {
				res.status(201).json({message: "OK", data: task});
			}
		});
	});

	app.get('/personalTasks', function(req, res) {
		var where = req.query.where ? JSON.parse(req.query.where) : {},
			sort = eval("("+req.query.sort+")"),
			select = req.query.select ? JSON.parse(req.query.select) : {},
			skip = req.query.skip || 0,
			limit = req.query.limit ? JSON.parse(req.query.limit) : 0,
			count = (req.query.count === "true") || false;

		console.log("sort"+JSON.stringify(sort)+" where:"+ JSON.stringify(where));
		if (count) {
			personalTask.find(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(err, tasks) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({ message: "OK", data: tasks });
				}
			});
		} else {
			console.log("not count");
			personalTask.find(where).sort(sort).select(select).skip(skip).limit(limit).exec(function (err, tasks) {
				console.log("In execute");
				if(tasks.length==0){
					res.status(200).json({message: "OK", data: []});
				}else{
					if (err) {
						res.status(500).json({message: "Server error", data: err});
					}
					else {
						res.status(200).json({message: "OK", data: tasks});
					}
				}
			});
		}
	});


	app.post('/todos', function(req, res) {
		var task = new todo();
		task.userid = req.body.userid;
		task.taskType = req.body.taskType;
		task.taskid = req.body.taskid;
		task.description = req.body.description||"";
		task.timespan = req.body.timespan||[];

		task.save(function(err){
			if (err) {
				res.status(500).json({ message: "Server error", data: err });
			} else {
				res.status(201).json({message: "OK", data: task});
			}
		});
	});

	app.get('/todos', function(req, res) {
		var where = req.query.where ? JSON.parse(req.query.where) : {},
			sort = eval("("+req.query.sort+")"),
			select = req.query.select ? JSON.parse(req.query.select) : {},
			skip = req.query.skip || 0,
			limit = req.query.limit ? JSON.parse(req.query.limit) : 0,
			count = (req.query.count === "true") || false;

		console.log("sort"+JSON.stringify(sort)+" where:"+ JSON.stringify(where));
		if (count) {
			todo.find(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(err, tasks) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({ message: "OK", data: tasks });
				}
			});
		} else {
			console.log("not count");
			todo.find(where).sort(sort).select(select).skip(skip).limit(limit).exec(function (err, tasks) {
				console.log("In execute");
				//if(tasks.length==0){
				res.status(200).json({message: "OK", data: []});
				// }else{
				if (err) {
					res.status(500).json({message: "Server error", data: err});
				} else {
					res.status(200).json({message: "OK", data: tasks});
					//   }
				}
			});
		}
	});


	app.get('/courses/:id', function(req, res) {
		Course.findById(req.params.id, function(err,course){
			if(err)
				res.status(500).send(err);
			else if(course==undefined || course==null){
				res.status(404).json({ message: "course not found" });
			}else{
				res.status(200).json({message: "OK", data: course});
			}
		});
	});

	app.delete('/courses/:id', function(req, res) {
		Course.remove({_id: req.params.id}, function(err,course){
			if(err){
				res.status(500).send({message: "Server error", data: []});
			}else if(course ==undefined||course==null){
				res.status(404).send({message: "course not found", data: []});
			}
			else{
				res.status(200).json({message: "OK", data: [] });
			}
		});
	});

	app.put('/courses/:id', function(req, res) {
		Course.findById(req.params.id, function(err,course){
			if(err)
				res.status(500).send(err);
			else if(course==undefined || course==null){
				res.status(404).json({ message: "course not found" });
			}else{
				course.name = req.body.name;
				course.description = req.body.description;
				course.homepage = req.body.homepage;
				course.instructorid = req.body.instructorid;
				course.instructorName = req.body.instructorName;
				course.courseTaskList = req.body.courseTaskList;
				course.studentList = req.body.studentList;

				course.save(function(err) {
					if (err) {
						res.status(500).json({ message: "Server error", data: err });
					} else {
						res.status(200).json({
							data: course, message: "User has been updated!"
						});
					}
				});
			}
		});
	});



	app.get('/courseTasks/:id', function(req, res) {
		courseTask.findById(req.params.id, function(err,task){
			if(err)
				res.status(500).send(err);
			else if(!task ||task==undefined){
				res.status(404).json({ message: "Task not found" });
			}else{
				res.status(200).json(task);
			}
		});
	});
	app.delete('/courseTasks/:id', function(req, res) {
		courseTask.remove({_id: req.params.id}, function(err,task){
			if(err){
				res.status(500).send({message: "Server error", data: []});
			}else if(task ==undefined||task==null){
				res.status(404).send({message: "Task not found", data: []});
			}
			else{
				res.status(200).json({message: "OK", data: [] });
			}
		});
	});
	app.put('/courseTasks/:id', function(req, res) {
		if (!req.body.name || !req.body.deadline) {
			res.status(500).json({ message: "Server error, no name or deadline", data: {} });
		}else{
			courseTask.findById(req.params.id, function(err,task){
				if(err)
					res.status(500).send(err);
				else if(task==undefined||!task){
					res.status(404).json({ message: "Task not found" });
				}else{

					task.courseid = req.body.courseid;
					task.description = req.body.description||"";
					task.courseName = req.body.courseName;
					task.releaseDate = req.body.releaseDate;
					task.dueDate = req.body.dueDate;
					task.save(function(err) {
						if (err) {
							res.status(500).json({ message: "Server error", data: err });
						} else {
							res.status(200).json({
								data: task, message: "Task has been updated!"
							});
						}
					});
				}
			});
		}
	});



	app.get('/personalTasks/:id', function(req, res) {
		personalTask.findById(req.params.id, function(err,task){
			if(err)
				res.status(500).send(err);
			else if(!task ||task==undefined){
				res.status(404).json({ message: "Task not found" });
			}else{
				res.status(200).json(task);
			}
		});
	});
	app.delete('/personalTasks/:id', function(req, res) {
		personalTask.remove({_id: req.params.id}, function(err,task){
			if(err){
				res.status(500).send({message: "Server error", data: []});
			}else if(task ==undefined||task==null){
				res.status(404).send({message: "Task not found", data: []});
			}
			else{
				res.status(200).json({message: "OK", data: [] });
			}
		});
	});
	app.put('/personalTasks/:id', function(req, res) {
		//Tasks cannot be created (or updated) without a name or a deadline.
		if (!req.body.name || !req.body.deadline) {
			res.status(500).json({ message: "Server error, no name or deadline", data: {} });
		}else{
			personalTask.findById(req.params.id, function(err,task){
				if(err)
					res.status(500).send(err);
				else if(task==undefined||!task){
					res.status(404).json({ message: "Task not found" });
				}else{

					task.userid = req.body.userid;
					task.courseid = req.body.courseid;
					task.description = req.body.description||"";
					task.courseName = req.body.courseName;
					task.releaseDate = req.body.releaseDate;
					task.dueDate = req.body.dueDate;
					task.save(function(err) {
						if (err) {
							res.status(500).json({ message: "Server error", data: err });
						} else {
							res.status(200).json({
								data: task, message: "Task has been updated!"
							});
						}
					});
				}
			});
		}
	});


	app.get('/todos/:id', function(req, res) {
		todo.findById(req.params.id, function(err,task){
			if(err)
				res.status(500).send(err);
			else if(!task ||task==undefined){
				res.status(404).json({ message: "Task not found" });
			}else{
				res.status(200).json(task);
			}
		});
	});

	app.delete('/todos/:id', function(req, res) {
		todo.remove({_id: req.params.id}, function(err,task){
			if(err){
				res.status(500).send({message: "Server error", data: []});
			}else if(task ==undefined||task==null){
				res.status(404).send({message: "Task not found", data: []});
			}
			else{
				res.status(200).json({message: "OK", data: [] });
			}
		});
	});

	app.put('/todos/:id', function(req, res) {
		if (!req.body.name || !req.body.deadline) {
			res.status(500).json({ message: "Server error, no name or deadline", data: {} });
		}else{
			todo.findById(req.params.id, function(err,task){
				if(err)
					res.status(500).send(err);
				else if(task==undefined||!task){
					res.status(404).json({ message: "Task not found" });
				}else{

					task.userid = req.body.userid;
					task.taskType = req.body.taskType;
					task.taskid = req.body.taskid;
					task.description = req.body.description||"";
					task.timespan = req.body.timespan||[];
					task.save(function(err) {
						if (err) {
							res.status(500).json({ message: "Server error", data: err });
						} else {
							res.status(200).json({
								data: task, message: "Task has been updated!"
							});
						}
					});
				}
			});
		}
	});




	app.get('/studentusers', isLoggedIn, function(req, res) {
		var where = req.query.where ? JSON.parse(req.query.where) : {},
			sort = eval("("+req.query.sort+")"),
			select = req.query.select ? JSON.parse(req.query.select) : {},
			skip = req.query.skip || 0,
			limit = req.query.limit ? JSON.parse(req.query.limit) : 0,
			count = (req.query.count === "true") || false;

		//console.log("sort"+JSON.stringify(sort)+" where:"+ JSON.stringify(where));
		if (count) {/*mongoose.model('User')*/
			studentUser.find(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(err, users) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({ message: "OK", data: users });
				}
			});
		} else {
			console.log("not count");
			studentUser.find(where).sort(sort).select(select).skip(skip).limit(limit).exec(function (err, users) {
				console.log("In execute");
				if(users.length==0){
					res.status(200).json({message: "OK", data: []});
				}else{
					if (err) {
						res.status(500).json({message: "Server error", data: err});
					} else {
						res.status(200).json({message: "OK", data: users});
					}
				}
			});
		}
	});

	app.get('/instructorusers', isLoggedIn, function(req, res) {
		var where = req.query.where ? JSON.parse(req.query.where) : {},
			sort = eval("("+req.query.sort+")"),
			select = req.query.select ? JSON.parse(req.query.select) : {},
			skip = req.query.skip || 0,
			limit = req.query.limit ? JSON.parse(req.query.limit) : 0,
			count = (req.query.count === "true") || false;

		//console.log("sort"+JSON.stringify(sort)+" where:"+ JSON.stringify(where));
		if (count) {/*mongoose.model('User')*/
			instructorUser.find(where).sort(sort).select(select).skip(skip).limit(limit).count().exec(function(err, users) {
				if (err) {
					res.status(500).json({ message: "Server error", data: err });
				} else {
					res.status(200).json({ message: "OK", data: users });
				}
			});
		} else {
			console.log("not count");
			instructorUser.find(where).sort(sort).select(select).skip(skip).limit(limit).exec(function (err, users) {
				console.log("In execute");
				if(users.length==0){
					res.status(200).json({message: "OK", data: []});
				}else{
					if (err) {
						res.status(500).json({message: "Server error", data: err});
					} else {
						res.status(200).json({message: "OK", data: users});
					}
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