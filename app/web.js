var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var htmlDir = path.join(__dirname,'/public/');
var vendorDir = path.join(__dirname,'../bower_components/');

app.get('/login', function(req, res) {
    res.sendfile(path.join(htmlDir,'index.html'));
});
app.get('/register', function(req, res) {
    res.sendfile(path.join(htmlDir,'index.html'));
});
app.get(/^\/vendor\/(.*)$/, function(req, res) {
    var filePath = path.join(vendorDir,req.params[0]);
    console.log('Requesting '+filePath);
    fs.stat(filePath, function(err, stat) {
      if (err || !stat.isFile()) {
        filePath = path.join(htmlDir,'404.html')
      }
      console.log('Serving', filePath);
      res.sendfile(filePath);
    });
});
app.get(/^(.*)$/, function(req, res) {
    res.sendfile(path.join(htmlDir,'404.html'));
});


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
