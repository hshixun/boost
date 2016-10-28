var path = require('path');
var child_process = require('child_process');
var colors = require('colors/safe');
/*
  data = { cmd:
           opts:
           text:
           cwd:
         }
*/
module.exports = function(data, cb){
  console.log(colors.yellow(data.text));
  console.log(data.cmd);
  var p;
  if(data.opts && data.opts.length > 0){
    p = child_process.spawn(data.cmd, data.opts, {
      cwd: data.cwd
    });
  } else {
    p = child_process.spawn(data.cmd, {
      cwd: data.cwd
    });
  }
  p.stdout.on('data', function(data){
    process.stdout.write(data);
  });
  p.stderr.on('data', function(data){
    process.stderr.write(data);
  });
  p.on('exit', function(code){
    if(code) return next(data.text + ' exited with ' + code);
    return cb(null)
  });
}
