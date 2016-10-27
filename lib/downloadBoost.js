var path = require('path');
var downloadFile = require('./downloadFile');

module.exports = function(version, cb){
  var fname = "boost_" + version.replace(/\./g, "_") +".tar.gz";
  var savePath = path.join(__dirname, "../download", fname);
  //https://sourceforge.net/projects/boost/files/boost/1.62.0/boost_1_62_0.tar.gz/download  
  var url = "https://sourceforge.net/projects/boost/files/boost/" + version + 
        "/" + fname + "/download";
  downloadFile({ filename: fname,
                 savePath: savePath,
                 url: url}, cb);
}