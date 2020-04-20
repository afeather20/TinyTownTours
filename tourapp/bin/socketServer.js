var app = require('../app');
var http = require('http');

var io = require('socket.io')(http).listen(444);

  io.sockets.on('connection', function(socket){
    console.log("Client Conected")
   
      //io.emit('connected', "NDNDNDNDN");
 
  });


