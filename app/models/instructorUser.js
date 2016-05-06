/**
 * Created by r on 4/18/16.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our beer schema
var instructorUserSchema = new mongoose.Schema({
    accountType: String,
    name: {
        type: String,
        //required: true
    },
    local:{
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: String
    },
    courseid: String
});

instructorUserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

instructorUserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// Export the Mongoose model
module.exports = mongoose.model('instructorUser', instructorUserSchema);

