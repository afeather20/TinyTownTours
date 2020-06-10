$(document).ready(function() { 
  console.log(PageData.socketIpAddress);
  var socket = io.connect(PageData.socketIpAddress);

  socket.on('connected', function(msg) {
    console.log(msg )
  })

});