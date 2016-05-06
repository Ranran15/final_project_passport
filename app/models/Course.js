// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    homepage:String,
    instructorid:String,
    instructorName:String,
    courseTaskList: [{courseTaskid:String, averageTimeSpent:Number}],
    studentList: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('Course', CourseSchema);
