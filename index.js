#!/usr/bin/env node
'use strict';

//http://quickleft.com/blog/creating-and-publishing-a-node-js-module

var http = require('http'),
    server,
    logArray = [],
    config = {
    "port": 9090,
    "type": "html",
    "depth": 30
};


var _log = function(log) {
    logArray.push(log);
};

var sendRes = function(log,res){
  if(config.type === "html"){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(new Buffer('<script>console.log(' + JSON.stringify(log,censor(log)) + ')</script>'));
  }else if(config.type === "json"){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(log,censor(log)));
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

/*** from Eric Muyser (http://stackoverflow.com/users/119301/eric-muyser)***/
function censor(censor) {
  var i = 0, str;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value){
      return '[Circular]';
    }

    if(i >= config.depth){ // seems to be a harded maximum of 30 serialized objects?
      str = "Circular structure: ";
      return str + value;
    }

    ++i; // so we know we aren't using the original object anymore

    return value;
  }
}

//------------------------------------------------------------------

module.exports = {
  log: _log,
  config: _config,
  startServer: _startServer
}
