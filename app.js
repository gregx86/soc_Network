var express = require('express');
var mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/userDb');

//var User = require('./models/userModel.js');

var app = express();

var port = process.env.PORT || 3030;

//'============ Load routes ==============';
require('./routes')(app);
//'============ Load routes ==============';


app.listen(port, function() {
    console.log('Listening on port ' + port);
});
