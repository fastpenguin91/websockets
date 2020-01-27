function joinNs(endpoint){
  nsSocket = io(`http://localhost:9000${endpoint}`);
  //how is this different from the "io.on('connection', (socket) ... socket.emit()"
  nsSocket.on('nsRoomLoad',(nsRooms) => {
    // console.log("where is this?");
    // console.log(nsRooms);
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


    // add room automatically first time here
    const topRoom = document.querySelector('.room');
    const topRoomName = topRoom.innerText;
    //console.log(topRoomName);
    joinRoom(topRoomName);
  });


  // document.querySelector('.message-form')

  // socket.on('messageToClients') this chunk of code randomly got copied from another file and put here without any warning from the instructor.
  nsSocket.on('messageToClients', (msg)=> {
    console.log("msg yooo");
    console.log(msg);
    const newMsg = buildHTML(msg);
    document.querySelector('#messages').innerHTML += newMsg;
  });

  // Moved from scripts.js I dont know when it was deleted in the videos but it looks like this chunk shouldnt be here
  document.querySelector('.message-form').addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log("Form submitted!");
    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage);
    nsSocket.emit('newMessageToServer', {text: newMessage});
  });

};

function buildHTML(msg){
  console.log("avatar");
  console.log(msg.avatar);
  const convertedDate = new Date(msg.time).toLocaleString();
  const newHTML = `
        <li>
        <div class="user-image">
          <img src="${msg.avatar}" />
        </div>
        <div class="user-message">
        <div class="user-name-time">${msg.username}<span>${convertedDate}</span></div>
        <div class="message-text">${msg.text}</div>
        </div>
    </li>
`
  return newHTML;
}
