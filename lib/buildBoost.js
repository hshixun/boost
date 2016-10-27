var os = require('os');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var async = require('async');
var colors = require('colors/safe');
var sprintf = require('sprintfjs');

module.exports = function(buildPath, cb){
  console.log(buildPath);
  var basen = path.basename(buildPath);
  console.log(colors.yellow('build ' + basen));
  
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    async.waterfall([
      function(next){
        var cmd = path.join(buildPath, "bootstrap.sh");
        console.log(cmd);
        var p = child_process.spawn(cmd, {
          cwd: buildPath
        });
        p.stdout.on('data', function(data){
          process.stdout.write(data);
        });
        p.stderr.on('data', function(data){
          process.stderr.write(data);
        });
        p.on('exit', function(code){
          if(code) return next('bootstrap.sh exited with ' + code);
          return next(null)
        });
      }
    ], cb);
  } else if(platform == 'win32'){
    cb(null);//TODO
  }
}
