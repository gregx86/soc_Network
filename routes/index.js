module.exports = function(app){

    var bodyParser = require('body-parser');
    var UserAccount = require('../models/index');

    var userRouter = require('./user')(app);
    //   var postRouter = require('./post')(app);


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/users', userRouter);
   // app.use('/posts', postRouter);


    app.get('/', function(req, res, next) {
        res.sendfile('index.html');
    });

    app.post('/login', function(req, res) {
        console.log('login request');
        var email = req.params('email', null);
        var password = req.params('password', null);

        if( null == email || email.length < 1
            || null == password || password.length < 1){
            res.send(400);
            return;
        }

        UserAccount.login(email, password, function(success) {
            if( !success ) {
                res.send(401);
                return;
            }
            console.log('login was successful');
            res.send(200);
        });
    });

    app.post('/register', function(req, res, next) {
        var firstName = req.param('firstName', '');
        var lastName = req.param('lastName', '');
        var email = req.param('email', null);
        var password = req.param('password', null);

        if ( null == email || null == password ) {
            res.send(400);
            return;
        }

        UserAccount.register(email, password, firstName, lastName);
        res.send(200);
    });

    app.get('/account/authenticated', function(req, res, next){
        if ( req.session.loggedIn ) {
            res.send(200);
        } else {
            res.send(401);
        }
    });

    app.use(function(err, req, res, next) {
        var status = err.status || 500;

        res.status(status).send(err);
    });

};

