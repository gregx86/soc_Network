var mongoose = require('mongoose');
//var userSchema = require('../models/user');
//var postSchema = require('../models/user');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
//var Post = require('../models/user.js');

var UserHandler = function(){
    this.create = function(req, res, next){
        var body = req.body;
        var user = new User(body);

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        });
    };

    this.getAll = function(req, res, next){


        User
            .find()
            .populate('posts','title')
            .exec(function (err, response){
                if (err){
                    return next(err);
                }
                res.status(200).send(response);
            });

    };

    this.getById = function(req, res, next){
            var id = req.params.userId;

            User.findById(id, function (err, user) {
                if (err) {
                    return next(err);
                }else if(user) {
                    res.status(200).send(user);

                } else {
                    res.status(404).send('User not found');
                }
            });
        };

    this.updateUser = function(req, res, next){
            var id = req.params.userid;

            User.findById(id, function(err, user){
                user.name.first = req.body.name.first;
                user.name.last = req.body.name.last;
                user.email = req.body.email;
                user.age = req.body.age;
                user.save(function(err) {
                if(err){
                    return next(err);
                } else {
                    res.status(200).send(user);
                }
            });
        });
    };


    this.deleteUser = function(req, res, next) {
        var id = req.params.userid;

            User.findByIdAndRemove(id, function(err, response){
                if(err){
                    return next(err);
                } else {
                    res.status(204).send(response);
                }
            });
        };
};

module.exports = UserHandler;