var express = require('express');

var mongoose = require('mongoose');

var app = express();
var db;
var port = process.env.PORT || 3030;

require('./models');

mongoose.connect('mongodb://localhost/userDb');
db = mongoose.connection;


db.once('open', function(){
    //'============ Load routes ==============';
    require('./routes')(app);

    app.use(express.static(__dirname + '/public'));


    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});

db.on('error', function(err){
    console.log(err);
});


