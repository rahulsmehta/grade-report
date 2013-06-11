var express = require('express'),
    app = express(),
    jade = require('jade');

var http = require('http'),
    port = null;

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
    port = process.env.PORT;
});

app.configure('development',function(){
    port = 3000;
});

require('./routes.js').addRoutes(app);

var server = http.createServer(app);
server.listen(port);

console.log("Started server at port "+server.address().port);

