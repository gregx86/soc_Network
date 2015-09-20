var User = require('../models/userModel.js');

var Userhand = function(){
    this.create = function(req, res){
        var user = new User(req.body);

        user.save();
        res.status(201).send(user);

    };
    this.getAll = function(req, res){

        var query = {};

        if(req.query.name)
        {
            query.name = req.query.name;
        }
        User.find(query, function (err, users){
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(users);
            }
        });
    };

    this.getById = function(req, res){

            res.json(req.user);

        };


    this.updateUser = function(req, res){
        req.user.name = req.body.name;
        req.user.sourname = req.body.sourname;
        req.user.email = req.body.email;
        req.user.age = req.body.age;
        req.user.save(function(err) {
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
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

module.exports = Userhand;