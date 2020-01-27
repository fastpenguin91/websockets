function joinRoom(roomName){
  // Send this roomName to the server
  nsSocket.emit('joinRoom', roomName, (newNumberOfMembers)=>{
    // console.log("roomName on client? ");
    // console.log(roomName);
    // we want to update the room total now that we have joined
    document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers}<span class="glyphicon glyphicon-user"></span></span>`;
  });
};
