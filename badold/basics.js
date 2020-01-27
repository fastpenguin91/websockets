
// we need http because we dont have express
const http = require('http');

//we need socket.io
const socketio = require('socket.io');

// make an http server
const server = http.createServer((req, res) => {
  res.end("I am connected")
});

const io = socketio(server);

io.on('connection', (socket, req)=> {
  socket.emit('Welcome', 'Welcome to websockets server')
  socket.on('message', (msg)=> {
    console.log(msg)
  })
})


server.listen(8000);
