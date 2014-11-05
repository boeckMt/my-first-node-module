#!/usr/bin/env node
'use strict';

//http://quickleft.com/blog/creating-and-publishing-a-node-js-module

var http = require('http'),
    server,
    logArray = [],
    config = {
    "port": 9090,
    "type": "html"
};


var _log = function(log) {
    logArray.push(log);
};

var sendRes = function(log,res){
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
}


var _startServer = function(port){
    server = http.createServer(function (req, res) {
      var log, l, key, resBody = {};

      for(l = 0; l < logArray.length;l++){
        log = logArray[l];
        key = "log"+ (l+1);
        resBody[key]= log;
      }
      sendRes(resBody,res);

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });


    if(port){
      config.port = port;
      server.listen( config.port , '127.0.0.1');
    }else{
      server.listen( config.port , '127.0.0.1');
    }
    console.log("#-----------------------------------");
    console.log('Log-Server at http://127.0.0.1:'+ config.port +'/');

}

var _config = function(obj){
  for(var key in obj){
    if(config.hasOwnProperty(key)){
      config[key]= obj[key];
    }
  }
};

//------------------------------------------------------------------
/*
process.on('uncaughtException', function(err) {
    // handle the error safely
    if(err.code === 'EADDRINUSE'){
        console.log("look if port is already in use!");
    }
    throw err;
});
*/
module.exports = {
  log: _log,
  config: _config,
  startServer: _startServer
}
