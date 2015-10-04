module.exports = function(app){

    var bodyParser = require('body-parser');

    var userRouter = require('./user')(app);
    var postRouter = require('./post')(app);


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


    app.use('/users', userRouter);
    app.use('/posts', postRouter);



    app.get('/', function(req, res){
        res.send('welcome to my Soc Network!');
    });

};

