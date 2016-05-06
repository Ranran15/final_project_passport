/**
 * Created by r on 4/23/16.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var personalTaskSchema = new mongoose.Schema({
    userid:{type:String, required:true},
    courseid:String,
    courseName: String,
    name: {type:String, required:true},
    description: String,
    releaseDate: { type: Date, default: Date.now },
    dueDate: Date
});

// Export the Mongoose model
module.exports = mongoose.model('personalTask', personalTaskSchema);

