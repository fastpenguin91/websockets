const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));
// const io = socketio();
// io.attach(expressServer)
// The above 2 lines are the same as : const io = socketio(expressServer);

const expressServer = app.listen(9000);
const io = socketio(expressServer);
//same as below: io.on = io.of('/').on // which is why this only works on / namespace
// if namespace is not specified it uses / by default
io.on('connection', (socket)=>{
  socket.emit('messageFromServer', {data: "Welcome to the socket.io server"});
  socket.on('dataToServer',(dataFromClient)=> {
    console.log(dataFromClient);
  });
  socket.on('newMessageToServer', (msg)=>{
    console.log(msg)
    io.emit('messageToClients', {text:msg.text})
    // this: io.emit('messageToClients', {text:msg.text})
    // is the same as io.of('/').emit('messageToClients', {text:msg.text})
  })

  //Server can communicate across namespaces but on client information, socket needs to be in that namespace in order to get the events.
  io.of('/admin').emit('welcome', "Welcome to the admin channel, from the main channel!");


})


io.of('/admin').on('connection', (socket)=>{
  console.log("someone connected to admin namespace");
  io.of('/admin').emit('welcome', "welcome to the admin channel!");
})
















































// const express = require('express');
// const app = express();
// const socketio = require('socket.io')

// app.use(express.static(__dirname + '/public'));

// const expressServer = app.listen(9000);
// const io = socketio(expressServer);
// io.on('connection',(socket)=>{
//     socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
//     socket.on('messageToServer',(dataFromClient)=>{
//         console.log(dataFromClient)
//     })
//     socket.on('newMessageToServer',(msg)=>{
//         // console.log(msg)
//         io.emit('messageToClients',{text:msg.text})
//     })
// })

