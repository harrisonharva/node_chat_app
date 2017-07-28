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

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    a.attr('href', message.url);
    li.text(`${message.from}:`).append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('#message');
    var form_name = "testUser_"+new Date().getTime();
    socket.emit('createMessage',{
        from: form_name,
        text: messageTextBox.val()
    }, function(data) {
        console.log("Message form data acknowledged");
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
    e.preventDefault();
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function(position) {
        console.log('Unable to fetch user location');
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
    });
})
