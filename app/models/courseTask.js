/**
 * Created by r on 4/23/16.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var courseTaskSchema = new mongoose.Schema({
    courseid:String,
    courseName: {
        type: String,
        required: true
    },
    description: String,
    releaseDate: { type: Date, default: Date.now },
    dueDate: Date
});

// Export the Mongoose model
module.exports = mongoose.model('courseTask', courseTaskSchema);

