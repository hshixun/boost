var os = require('os');
var path = require('path');
var downloadFile = require('./downloadFile');

module.exports = function(version, cb){
  var url, fname, savePath;
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    fname = "boost_" + version.replace(/\./g, "_") +".tar.gz";
    savePath = path.join(__dirname, "../download", fname);
    //https://sourceforge.net/projects/boost/files/boost/1.62.0/boost_1_62_0.tar.gz/download  
    url = "https://sourceforge.net/projects/boost/files/boost/" + version + 
        "/" + fname + "/download";
  } else if(platform == 'win32'){
    fname = "boost_" + version.replace(/\./g, "_") +".zip";
    savePath = path.join(__dirname, "../download", fname);
    url = "https://sourceforge.net/projects/boost/files/boost/" + version + 
        "/" + fname + "/download";
  } else {
    return cb('not support');
  }
  downloadFile({ filename: fname,
                 savePath: savePath,
                 url: url}, cb);
}