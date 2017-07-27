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
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});
socket.on('newConnection', function(message){
    console.log("from :"+message.from);
    console.log("text :"+message.text);
    console.log("createdAt :"+message.createdAt);
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});
socket.on('userDisconnected', function(message){
    console.log('User disconnected Event');
    console.log("from :"+message.from);
    console.log("text :"+message.text);
    console.log("createdAt :"+message.createdAt);
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var form_name = "testUser_"+new Date().getTime();
    socket.emit('createMessage',{
        from: form_name,
        text: jQuery('#message').val()
    }, function(data) {
        console.log("Message form data acknowledged");
    });
});
