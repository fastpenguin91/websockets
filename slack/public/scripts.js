const socket = io('http://localhost:9000');
// const socket2 = io('http://localhost:9000/wiki'); // the admin namespace
// const socket3 = io('http://localhost:9000/mozilla'); // the admin namespace
// const socket4 = io('http://localhost:9000/linux'); // the admin namespace


console.log(socket.io)
socket.on('connect', ()=>{
  console.log(socket.id)
});

// Listen for nsList, which is a list of all the namespaces.
socket.on('nsList', (nsData)=> {
  console.log("The list of namespaces has arrived");
  console.log(nsData);
  let namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns)=>{
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`;
  })


  // Add a click listener for each namespace
  Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
    //console.log(elem);
    elem.addEventListener('click', (e)=>{
      const nsEndpoint = elem.getAttribute('ns');
      console.log(`${nsEndpoint} I should go to now`);
    })
  })

})


socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', {data: "Data from the client!"});
});


document.querySelector('#message-form').addEventListener('submit', (event)=>{
  event.preventDefault();
  console.log("Form submitted!");
  const newMessage = document.querySelector('#user-message').value;
  console.log(newMessage);
  socket.emit('newMessageToServer', {text: newMessage});
});
