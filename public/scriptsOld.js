const socket = io('http://localhost:9000');
const socket2 = io('http://localhost:9000/admin') // the admin namespace


socket.on('connect', ()=>{
  console.log("/ socket")
  console.log(socket.id)
})

socket2.on('connect', ()=>{
  console.log("/admin socket")
  console.log(socket2.id)
});

socket2.on('welcome',(msg)=>{
  console.log(msg);
})

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('dataToServer', {data: "Data from the client!"});
});

document.querySelector('#message-form').addEventListener('submit', (event)=>{
  event.preventDefault();
  console.log("Form submitted!");
  const newMessage = document.querySelector('#user-message').value;
  console.log(newMessage);
  socket.emit('newMessageToServer', {text: newMessage});
});

socket.on('messageToClients', (msg)=>{
  console.log(msg)
  document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
});

socket.on('ping', ()=> {
  console.log('Ping was received from the server');
  console.log("aa h a");
});

socket.on('pong', (latency)=> {
  console.log(latency);
  console.log('Pong was sent to the server');
});

