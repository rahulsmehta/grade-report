var redis = null,
    client = null,
    jade = require('jade');
    exec = require('child_process').exec;

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
  res.send('200 - Success');
}

var upload = function(req,res){
  console.log(req.method + " " + req.url+" "+new Date());
}

var run = function(req,res){
  var proc = exec('java test');
      restext = '';

  proc.stdout.setEncoding('utf-8');
  proc.stdout.on('data',function(_data){
    restext+=_data;
  });
  proc.on('exit',function(){
    res.send(restext || 'File did not execute.');
  }); 
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

exports.addRoutes = function(app){
      app.get('/',display);
      app.get('/run',run);
      app.post('/upload',upload);
};
