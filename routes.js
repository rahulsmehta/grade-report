// Include jade and child_process for executing java tests
var redis = null,
    client = null,
    jade = require('jade'),
    exec = require('child_process').exec,
    ROOT = __dirname;

if(process.env.REDISTOGO_URL){
    var rtg = require('url').parse(process.env.REDISTOGO_URL);
    var redis = require('redis'),
        client = redis.createClient(rtg.port,rtg.hostname);
    client.auth(rtg.auth.split(':')[1]); //Authenticate
} else {
    redis = require('redis');
    client = redis.createClient();
}

//var sendData = function(req,res){
//    console.log(req.method + " " + req.url+" "+new Date());
//    req.setEncoding('utf8');
//    var _id = req.params.id,
//        _text = null;
//    client.get(_id,function(err,reply){
//        if(reply){
//            _text = jade.compile(reply)();
//        } else {
//            _text = "Data not found";
//        }
//        res.send(_text);
//    });
//};

var display = function(req,res){
  console.log(req.method + " " + req.url+" "+new Date());
  res.render('index.jade');
}


var _run = require('./handlers/run');
    _run.setDir(ROOT),
    _run.setExec(exec);
    var run = _run.runFile;

var _upload = require('./handlers/upload'); //Require upload module
    _upload.setClient(client); //Pass redis client to upload module
    _upload.setDir(ROOT); //Set root dir for uploader
    var upload = _upload.upload;  //Grab the actual upload route


//var sendData = function(req,res){
//    console.log(req.method + " " + req.url+" "+new Date());
//    req.setEncoding('utf8');
//    var _id = req.params.id,
//        _text = null
//    client.get(_id,function(err,reply){
//        if(reply){
//            _text = jade.compile(reply)();
//        } else {
//            _text = "Data not found";
//        }
//        res.send(_text);
//    });
//};

exports.addRoutes = function(app){
  app.get('/',function(req,res){
    res.render('index.jade');
  });
  app.post('/run',run);
  app.post('/upload',upload); //TODO: Upload with tarballs
};
