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
  // const thisNs = io.of(namespace.endpoint)
//  console.log("running namespaces loop on: ");
//  console.log(namespace.endpoint);

  io.of(namespace.endpoint).on('connection', (nsSocket)=>{
    // console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    // a socket has connected to one of our chatgroup namespaces,
    // send that ns group info back.
    nsSocket.emit('nsRoomLoad', namespaces[0].rooms);
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback)=>{
      // console.log("room to join: ");
      // console.log(roomToJoin);
      // deal with history later
      nsSocket.join(roomToJoin);
      io.of('/wiki').in(roomToJoin).clients((error, clients)=>{
        // console.log(clients.length);
        numberOfUsersCallback(clients.length);
      });
    });

    nsSocket.on('newMessageToServer', (msg)=>{
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "jdog",
        avatar: 'https://via.placeholder.com/30'
      };
      console.log("the message");
      console.log(fullMsg);
      // Send this message to ALL sockets that are in the room that THIS socket is in.
      // How can we find out what rooms THIS socket is in?
      // console.log("socket rooms......");
      // console.log(nsSocket.rooms);
      /* User will be in 2nd room in the object list because the socket always joins
       its own room on connection.
       Get the keys*/
//      console.log("1 element of nsSocket.rooms below: ");
//      console.log(Object.keys(nsSocket.rooms)[1]);
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      console.log("room title");
      console.log(roomTitle);
      io.of('/wiki').to(roomTitle).emit('messageToClients',fullMsg);
    });
  });
});















































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

