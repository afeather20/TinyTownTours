var app = require('../app');
var http = require('http');


console.log("NANDNDNDANNDANDFANADFS");
var io = require('socket.io')(http).listen(444);
console.log("INDISDE EHRERRERE");
  io.sockets.on('connection', function(socket){
    console.log("Client Conected")
   
  io.emit('connected', "NDNDNDNDN");
 
  });


