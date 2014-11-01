nodefirebug
===========

send console.log from node to browser-console

## Installation

  npm install nodefirebug --save

## Usage
  var nfbug = require('nodefirebug');

  > -
  nfbug.config({
    "port":6000,
    "type": "json"
  });

  nfbug.log(obj);

  > or
  nfbug.log(obj,6000); //type: "html"

  > or
  nfbug.log(obj); //port: 9090,
