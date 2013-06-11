var dir = null,
    exec = null;

var run = function(req,res){
  console.log(req.body.fn);
  console.log(req.body.uid);
  var fn= req.body.fn,
      cmpl = exec('javac '+dir+'/uploads/'+fn+'.java');

  cmpl.on('exit',function(){
    console.log("compiled");
//    res.send("maybes");
    var proc = exec('java '+fn,{cwd:dir+'/uploads/'});
        restext = '';

    proc.stdout.setEncoding('utf-8');
    proc.stdout.on('data',function(_data){
      restext+=_data;
    });
    proc.on('exit',function(){
      res.send(fn+'.java ->'+ restext || 'File did not execute.');
    }); 
  });
}

exports.runFile = run;
exports.setDir = function(_dir){dir = _dir;};
exports.setExec = function(_exec){exec = _exec;};
