/*
  for compatibility and performance,
  use tar on linux
  use 7za on windows
  //bin\7za x build\boost_1_62_0.tar -obuild -r -y
*/
//var targz = require('tar.gz');
var os = require('os');
var path = require('path');
var child_process = require('child_process');
var colors = require('colors/safe');
var sprintf = require('sprintfjs');

module.exports = function(filePath, cb){
  var fname = path.basename(filePath);
  console.log(colors.yellow('extract ' + fname));
  /*
  var t1 = Date.now();
  targz().extract(filePath, path.join(__dirname, "../build"), function(err){
    if(err) return cb(err);
    var t2 = Date.now();
    console.log(colors.grey(sprintf("took %.3f sec",(t2 - t1)/1000)));
    return cb(null);
  }); 
  */
  var toPath = path.join(__dirname, "../build");
  var toPathTar = path.join(toPath, "boost.tar");
  var binPath = path.join(__dirname, "../bin");
  var platform = os.platform();
  var cmd;
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    cmd = "tar xf " + filePath + " -C "+ toPath
    child_process.exec(cmd, function(err, stdout, stderr){
      if(err) return cb(err);
      return cb(null);
    });
  } else if(platform == 'win32'){
    cmd = path.join(binPath,  "7za.exe") + " x " + filePath + " -o" + toPathTar + " -r -y";
    child_process.exec(cmd, function(err, stdout, stderr){
      if(err) return cb(err);
      return cb(null);
    });
  }
}