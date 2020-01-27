const express = require('express');
const app = express();
const socketio = require('socket.io');
let namespaces = require('./data/namespaces');
//console.log(namespaces);
app.use(express.static(__dirname + '/public'));
// const io = socketio();
// io.attach(expressServer)
// The above 2 lines are the same as : const io = socketio(expressServer);
const expressServer = app.listen(9000);
const io = socketio(expressServer);
//same as below: io.on = io.of('/').on // which is why this only works on / namespace
// if namespace is not specified it uses / by default




io.on('connection', (socket)=>{


  // build an array to send back with the img and endpoint for each NS
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    };
  });

  //  console.log(nsData);
  // send nsData back to the client. We need to use socket, NOT io, because we want it to go back to just this client...

  socket.emit('nsList', nsData);  // how does socket not send to all but io does? socket is just a call back for io...






  // socket.emit('messageFromServer', {data: "Welcome to the socket.io server"});
  // socket.on('messageToServer',(dataFromClient)=> {
  //   console.log(dataFromClient);
  // });

  // socket.on('newMessageToServer', (msg)=>{
  //   //console.log(msg)
  //   // io.emit('messageToClients', {text:msg.text})
  //   io.of('/').emit('messageToClients',{text:msg.text})
  // })
  // // the server can still communicate across namespaces
  // // but on the clientInformation, the socket needs to be in THAT namespace
  // // in order to get the events

  // // socket.join('level1');
  // // socket.to('level1').emit('joined', `${socket.id} says: I have joined the level 1 room!`)

  // setTimeout(()=> {
  //   io.of('/admin').emit('welcome',"Welcome to the admin channel, from the main channel!")
  // })

})


// io.of('/admin').on('connection', (socket)=>{
//   console.log("someone connected to admin namespace");
//   io.of('/admin').emit('welcome', "welcome to the admin channel!");
// })

// loop through each namespace
namespaces.forEach((namespace) => {
  // console.log(namespace);

  io.of(namespace.endpoint).on('connection', (socket)=>{
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  })
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

