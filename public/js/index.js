var socket = io();
socket.on('connect', function() {
    console.log("Connected to Server");
    socket.emit('createMessage', {
        from: "test1@example.com",
        text: "This is testing test message",
    });
});
socket.on('disconnect', function() {
    console.log("Disconnected from server");
});
socket.on('newMessage', function(message){
    console.log('New Message Received Event', message);
    console.log(message);
    console.log("from :"+message.from);
    console.log("text :"+message.text);
    console.log("createdAt :"+message.createdAt);
});
