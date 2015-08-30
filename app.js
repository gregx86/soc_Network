var express = require('express');
var mongoose = require('mongoose');
//var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/userDb');

//var User = require('./models/userModel.js');

var app = express();

var port = process.env.PORT || 3030;

//'============ Load routes ==============';
require('./routes')(app);
//'============ Load routes ==============';
/*
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


userRouter = require('./routes/user.js')(User);

app.use('/users', userRouter);
//app.use('/users/posts', postRouter);


app.get('/', function(req, res){
    res.send('welcome to my Api!');
});
*/
app.listen(port, function() {
    console.log('Listening on port ' + port);
});