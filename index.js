#!/usr/bin/env node
'use strict';

//http://quickleft.com/blog/creating-and-publishing-a-node-js-module

var http = require('http');
var server;
function getType (type){
  var types = {
    "json": "application/json",
    "html":"text/html"
  }
  return types[type];
}

var config = {
    "port": 9090,
    "type": "html"
};

process.on('uncaughtException', function(err) {
    // handle the error safely
    if(err.code === 'EADDRINUSE'){
        console.log("look if port is already in use!");
    }
    throw err;
});

module.exports = {
  log:function(log,port) {
    var server = http.createServer(function (req, res) {
      if(config.type === "html"){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(new Buffer('<script>console.log(' + JSON.stringify(log) + ')</script>'));
      }else if(config.type === "json"){
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(log));
      }else{
        res.writeHead(406);
        res.end("not supported Content-Type!");
      }
    });

    if(port){
      config.port = port;
      server.listen( config.port , '127.0.0.1');
    }else{
      server.listen( config.port , '127.0.0.1');
    }
    console.log("#-----------------------------------");
    console.log('Log-Server at http://127.0.0.1:'+ config.port +'/');

  },
  config:function(obj){
    for(var key in obj){
      if(config.hasOwnProperty(key)){
        config[key]= obj[key];
      }
    }
  }

}
