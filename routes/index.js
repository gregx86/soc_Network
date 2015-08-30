module.exports = function(app){

    var bodyParser = require('body-parser');

    var userRouter = require('./user');

    var User = require('../models/userModel.js');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


    userRouter = require('../routes/user.js')(User);

    app.use('/users', userRouter);



    app.get('/', function(req, res){
        res.send('welcome to my Api!');
    });

};
