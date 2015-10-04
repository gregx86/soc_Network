var express = require('express');

var app = express();

var mongoose = require('mongoose');

require('./models');

var port = process.env.PORT || 3030;

mongoose.connect('mongodb://localhost/userDb');
var db = mongoose.connection;



//'============ Load routes ==============';
require('./routes')(app);
//'============ Load routes ==============';

db.once('open', function(){
    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });

});

db.on('error', function(err){
    console.log(err);
});


