var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/userDb');

var User = require('./models/userModel.js');

var app = express();

var port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



var userRouter = express.Router();

userRouter.route('/Users')
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

userRouter.route('/Users/:userId')
    .get(function(req, res){

       User.findById(req.params.userId, function (err, user){
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    });

app.use('/', userRouter);


app.get('/', function(req, res){
    res.send('welcome to my Api!');
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});