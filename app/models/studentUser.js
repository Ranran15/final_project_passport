/**
 * Created by r on 4/11/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our beer schema
var studentUserSchema = new mongoose.Schema({
    accountType: String,
    name: {
        type: String,
        //required: true
    },
    local: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: String
    },
    courseList: [{courseid:String, courseName:String}],
    courseTaskList:  [{courseid:String, courseTaskid:String, timespent:Number}],
    personalTaskList: [{courseid:String,
                        courseName:String, 
                        name:String, 
                        description:String, 
                        releaseDate: {type: Date, default: Date.now },
                        dueDate: Date,
                        timespent:Number}],
    todoList: [String]
});


studentUserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

studentUserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Export the Mongoose model
module.exports = mongoose.model('studentUser', studentUserSchema);

