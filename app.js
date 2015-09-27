var express = require('express');

var app = express();

var mongoose = require('mongoose');

require('./models');

var port = process.env.PORT || 3030;

mongoose.connect('mongodb://localhost/userDb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')
);

db.once('open', function(){
    console.log('connected');
});



//'============ Load routes ==============';
require('./routes')(app);
//'============ Load routes ==============';


app.listen(port, function() {
    console.log('Listening on port ' + port);
});
