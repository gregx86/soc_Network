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
            .populate('posts')
            .lean()
            .exec(function (err, response){
                if (err){
                    return next(err);
                }
                res.status(200).send(response);
            });

    };

    this.getById = function(req, res, next){
            var id = req.params.id;

            User.findById(id, function (err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(user);
            });
        };

    this.updateUser = function(req, res, next){
            var id = req.params.id;

            User.findById(id, function(err, user){
                user.name = req.body.name;
                user.sourname = req.body.sourname;
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

    this.updateParam = function(req, res){
        if(req.body._id){
            delete req.body._id;
        }
        for(var key in req.body){
            req.user[key] = req.body[key];
        }

        req.user.save(function(err) {
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    };

    this.deleteUser = function(req, res) {
            req.user.remove(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send('User removed');
                }
            });
        };
};

module.exports = UserHandler;