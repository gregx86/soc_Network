var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        first: {type: String},
        last: {type: String}
    },
    email: {type: String, unique: true},
    age: Number,
    dateOfBirth: {type: Date, default: Date.now},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
    createdAt: {type: Date, default: Date.now},
    isAdmin: Boolean
});

var PostSchema = new Schema ({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User',required: true},
    //_id: Number,
    title: String,
    description: String,
    created_at: {type: Date, default: Date.now}
});

//var User = mongoose.model('User', UserSchema);
//var Post = mongoose.model('Post', PostSchema);

//module.exports =
var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);

