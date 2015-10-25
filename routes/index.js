module.exports = function(app){

    var bodyParser = require('body-parser');
    //var session = require('express-session');
    var UserAccount = require('../models/user')();

    var userRouter = require('./user')(app);
    //   var postRouter = require('./post')(app);


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/users', userRouter);
   // app.use('/posts', postRouter);


    app.get('/', function(req, res, next) {
        res.sendfile('index.html');
    });

    app.post('/login', function(req, res, next) {
        console.log('login request');
        var email = req.body.email || null;
        var password = req.body.password || null;
        req.session.loggedIn = res.locals.loggedIn = null;

        if( null == email || email.length < 1
            || null == password || password.length < 1){
            res.sendStatus(400);
            return;
        }

        UserAccount.login(email, password, function(success) {
            if( !success ) {
                res.sendStatus(401);
                return;
            }
            console.log('login was successful');
            req.session.loggedIn = res.locals.loggedIn = true;
            res.sendStatus(200);
        });
    });

    app.post('/logout', function (req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/register', function(req, res, next) {
        var firstName = req.body.firstName || '';
        var lastName = req.body.lastName || '';
        var email = req.body.email || null;
        var password = req.body.password || null;

        if ( null == email || null == password ) {
            res.sendStatus(400);
            return;
        }

        UserAccount.register(email, password, firstName, lastName);
        res.sendStatus(200);
    });

    app.get('/account/authenticated', function(req, res, next){
        if ( req.session.loggedIn ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });

    app.use(function(err, req, res, next) {
        var status = err.status || 500;

        res.status(status).send(err);
    });

};

