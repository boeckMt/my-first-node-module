node-brwoser-log
================

send console.log from node to browser-console

## Installation

  npm install nodebrwoserlog --save

## Usage
  var nbl = require('nodebrwoserlog');

  > -
  nbl.config({
    "port":6000,
    "type": "json"
  });

  nbl.log(obj);

  > or
  nbl.log(obj,6000); //type: "html"

  > or
  nbl.log(obj); //port: 9090,
