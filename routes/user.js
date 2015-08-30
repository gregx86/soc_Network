var express = require('express');

var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('/')
        .post(function(req, res){
            var user = new User(req.body);

            user.save();
            res.status(201).send(user);

        })
        .get(function(req, res){

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
        });

    userRouter.use('/:userId', function(req, res, next) {
        User.findById(req.params.userId, function (err, user){
            if(err) {
                res.status(500).send(err);
            } else if(user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('User not found');
            }

        });
    });
    userRouter.route('/:userId')
        .get(function(req, res){

            res.json(req.user);

        })
        .put(function(req, res){
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
        })
        .patch(function(req, res){
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
        })
        .delete(function(req, res){
            req.user.remove(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send('User removed');
                }
            });
        });
    return userRouter;
};

module.exports = routes;