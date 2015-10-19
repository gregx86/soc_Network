module.exports = function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var crypto = require('crypto');



    var UserSchema = new Schema({
        name: {
            first: {type: String},
            last: {type: String}
        },
        email: {type: String, unique: true},
        password: String,
        age: Number,
        dateOfBirth: {type: Date, default: Date.now},
        photoUrl: String,
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

    //module.exports =
    var User = mongoose.model('User', UserSchema);
    var Post = mongoose.model('Post', PostSchema);

    var registerCallback = function(err) {
        if (err) {
            return console.log(err);
        }
        return console.log('Account was created');
    };

    var login = function(email, password, callback) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        User.findOne({email: email, password: shaSum.digest('hex')}, function(err, doc){
            callback(null!=doc);
        });
    };

    var register = function(email, password, firstName, lastName) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        console.log('Registering ' + email);
        var user = new User({
            email: email,
            name: {
                first: firstName,
                last: lastName
            },
            password: shaSum.digest('hex')
        });
        user.save(registerCallback);
        console.log('Save command was sent');
    };

    return {
        register: register,
        login: login,
        User: User,
        Post: Post
    };
};