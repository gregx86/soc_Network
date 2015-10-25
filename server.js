var express = require('express');

var mongoose = require('mongoose');

var app = express();
var db;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3030;

require('./models');

mongoose.connect('mongodb://localhost/userDb');
db = mongoose.connection;


db.once('open', function(){
    //'============ Load routes ==============';
    app.use(cookieParser());
    app.use(session({
        secret: "secretKey",
        cookie: {
            "path": "/",
            "httpOnly": true,
            "maxAge": null
        },
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: true

    }));

    require('./routes')(app);

    app.use(express.static(__dirname + '/public'));

    //app.use(function(req, res, next){
    //    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    //    console.log("Visits: " + req.session.numberOfVisits);
    //});


    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});

db.on('error', function(err){
    console.log(err);
});


