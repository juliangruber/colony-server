var colony = require('colony');
var fs = require('fs');
var http = require('http');
var serve = require('ecstatic')(__dirname + '/build/');

function gen (module, cb) {
  // todo: don't regenerate all the time

  var opts = {
    directory: __dirname + '/build/' + module,
    traverseModules: true
  };

  colony.npm(module, opts, cb);
}

http.createServer(function (req, res) {
  var m;
  if (m = req.url.match(/^\/([^\/]+)\/?$/)) {
    var module = m[1];
    gen(module, function (err) {
      if (err) return res.end(String(err));
      serve(req, res);
    })
  } else {
    serve(req, res);
  }
}).listen(5000);
