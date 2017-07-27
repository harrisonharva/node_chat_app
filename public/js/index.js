var socket = io();
socket.on('connect', function() {
    console.log("Connected to Server");
});
socket.on('disconnect', function() {
    console.log("Disconnected from server");
});
socket.on('newMessage', function(message){
    console.log("from :"+message.from);
    console.log("text :"+message.text);
    console.log("createdAt :"+message.createdAt);
    console.log(message);
});
socket.on('newConnection', function(message){
    console.log("from :"+message.from);
    console.log("text :"+message.text);
    console.log("createdAt :"+message.createdAt);
    console.log(message);
});
socket.on('userDisconnected', function(message){
    console.log('User disconnected Event');
    console.log("from :"+message.from);
    console.log("text :"+message.text);
    console.log("createdAt :"+message.createdAt);
    console.log(message);
});
socket.emit('createMessage', {
    from: "testUser1",
    text: "Hi !!!!"
}, function(data){
    console.log('Got it');
    console.log(data);
});
