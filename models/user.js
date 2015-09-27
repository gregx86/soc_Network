var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: String,
    sourname: String,
    email: String,
    age: Number,
    posts: [{ type: Number, ref: 'Post'}],
    createdAt: {type: Date, default: Date.now},
    isAdmin: Boolean
});

var PostSchema = new Schema ({
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _id: Number,
    title: String,
    description: String,
    created_at: {type: Date, default: Date.now}
});

//var User = mongoose.model('User', UserSchema);
//var Post = mongoose.model('Post', PostSchema);

//module.exports =
mongoose.model('User', UserSchema);
mongoose.model('Post', PostSchema);