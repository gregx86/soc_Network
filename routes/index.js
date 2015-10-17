module.exports = function(app){

    var bodyParser = require('body-parser');

    var userRouter = require('./user')(app);
    //   var postRouter = require('./post')(app);


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/users', userRouter);
   // app.use('/posts', postRouter);


    app.get('/', function(req, res, next) {
        res.sendfile('index.html');
    });

    app.use(function(err, req, res, next) {
        var status = err.status || 500;

        res.status(status).send(err);
    });

};

