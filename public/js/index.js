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
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        createdAt: formattedTime,
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from:message.from,
        url:message.url,
        createdAt: formattedTime,
    });
    jQuery('#messages').append(html);
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
