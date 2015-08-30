var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userModel = new Schema({
    name: String,
    sourname: String,
    email: String,
    age: Number,
    posts: [{ title: String, description: String, date: Date}],
    createdAt: {type: Date, default: Date.now},
    isAdmin: Boolean
});

module.exports = mongoose.model('User', userModel);