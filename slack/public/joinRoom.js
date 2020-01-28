function joinRoom(roomName){
  // Send this roomName to the server
  nsSocket.emit('joinRoom', roomName, (newNumberOfMembers)=>{
    // console.log("roomName on client? ");
    // console.log(roomName);
    // we want to update the room total now that we have joined
    document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers}<span class="glyphicon glyphicon-user"></span></span>`;
  });

  nsSocket.on('historyCatchUp',(history)=>{
    console.log(history);
    const messagesUl = document.querySelector('#messages');
    messagesUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildHTML(msg);
      const currentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currentMessages + newMsg;
    });
    messagesUl.scrollTo(0,messagesUl.scrollHeight);
  });

  nsSocket.on('updateMembers',(numMembers)=>{
    document.querySelector('.curr-room-num-users').innerHTML = `${numMembers}<span class="glyphicon glyphicon-user"></span></span>`;
    document.querySelector('.curr-room-text').innerText = `${roomName}`;
  });

};
