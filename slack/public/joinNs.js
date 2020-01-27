function joinNs(endpoint){
  const nsSocket = io(`http://localhost:9000${endpoint}`);
  //how is this different from the "io.on('connection', (socket) ... socket.emit()"
  nsSocket.on('nsRoomLoad',(nsRooms) => {
    console.log(nsRooms);
    let roomList = document.querySelector('.room-list');
    roomList.innerHTML = "";
    nsRooms.forEach((room)=> {
      let glyph;
      if(room.privateRoom){
        glyph = 'lock';
      } else {
        glyph = 'globe';
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });

    // add click listener for each room
    let roomNodes = document.getElementsByClassName('room');
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener('click',(e)=>{
        console.log("Someone clicked on the ", e.target.innerText);
      });
    });
  });

  // document.querySelector('.message-form')

  // socket.on('messageToClients') this chunk of code randomly got copied from another file and put here without any warning from the instructor.
  nsSocket.on('messageToClients', (msg)=> {
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
  });

  // Moved from scripts.js I dont know when it was deleted in the videos but it looks like this chunk shouldnt be here
  document.querySelector('.message-form').addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log("Form submitted!");
    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage);
    socket.emit('newMessageToServer', {text: newMessage});
  });

};
