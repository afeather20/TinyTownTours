
var app = require('../app');
const fs = require('fs');
var https = require('https');
const path = require("path");
const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "../domain.key")),
  cert: fs.readFileSync(path.resolve(__dirname,"../domain.crt"))
}


var server = https.createServer(httpsOptions, app);

server.listen(3002);


var io = require('socket.io')(server);


io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('connected', "NDNDNDNDN");
});


