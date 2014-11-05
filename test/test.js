var nbl = require('../index');

//option:1 ---------------------------
nbl.config({
  "port":9999,
  "type":"json"
})

nbl.startServer();

//option:2----------------------------
//nbl.startServer(7777); //type: "html"

//option:3----------------------------
//nbl.startServer(); //port: 9090, type: "html"

//----------------------------



var obj = {
  "name":"sepp",
  "color":"blue",
  "age": 300,
  "dead":true,
  "childs":{
    "hans":"male",
    "susi":"female"
  }
};

var arr = [1,2,3,4,"hans"];



nbl.log(obj);
nbl.log(arr);
