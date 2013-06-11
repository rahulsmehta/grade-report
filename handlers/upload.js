var client = null,
    dir = null,
    fs = require('fs'),
    crypto = require('crypto');

var hash = function(_str){
  var shasum = crypto.createHash('sha1');
  shasum.update(_str);
  var res = shasum.digest('hex');
  return res;
}

var upload = function(req,res){
  if(!client){
    res.statusCode = 500;
    res.send('redis client not found');
  }

  console.log(JSON.stringify(req.files.file)); //TODO: Change hash to directory name and keep org file name
  var fn = hash(req.body.uid+req.files.file.name);
  var pathname = dir+"/uploads/"+fn+'.java';
  fs.readFile(req.files.file.path,function(err,_data){
    fs.open(pathname,'w+',function(err,fd){
      fs.write(fd,_data,0,_data.length,null,function(err){
        res.render('runtest.jade',{fn:fn+'.java',uid:req.body.uid});
      });
    });
  });
} 


exports.upload = upload;
exports.setClient = function(_client){client = _client;};
exports.setDir = function(_dir){dir = _dir;};
