/**
 * Created by r on 4/23/16.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var todoTaskSchema = new mongoose.Schema({
    userid:{type:String, required:true},
    taskType:String,
    taskid: String,
    description: String,
    timespan: [Date]
});



// Export the Mongoose model
module.exports = mongoose.model('todo', todoTaskSchema);

