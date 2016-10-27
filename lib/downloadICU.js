var os = require('os');
var path = require('path');
var downloadFile = require('./downloadFile');

module.exports = function(cb){
  var url, fname, savePath;
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    fname = "icu4c-58_1-src.tgz";
    savePath = path.join(__dirname, "../download", fname);
    url = "http://download.icu-project.org/files/icu4c/58.1/icu4c-58_1-src.tgz";
  } else if(platform == 'win32'){
    fname = "icu4c-58_1-src.zip";
    savePath = path.join(__dirname, "../download", fname);
    url = "http://download.icu-project.org/files/icu4c/58.1/icu4c-58_1-src.zip";
  } else {
    return cb('not support');
  }
  downloadFile({ filename: fname,
                 savePath: savePath,
                 url: url}, cb);
}

