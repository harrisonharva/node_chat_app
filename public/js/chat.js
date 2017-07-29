var socket = io();

function scrollToBottom(){
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if((clientHeight+scrollTop+newMessageHeight+lastMessageHeight) >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log("Connected to Server");
    var params = jQuery.deparam(window.location.search);
    socket.emit("join", params, function(error) {
        if(error) {
            alert(error);
            window.location.href = "/";
        } else {
            console.log("No Error so connecting to chat page");
        }
    });
});
socket.on('disconnect', function() {
    console.log("Disconnected from server");
});
socket.on('updateUserList', function(users){
    console.log('Users List:', users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});
socket.on('newMessage', function(message){
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        createdAt: formattedTime,
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('#message');
    var form_name = $('#name');
    socket.emit('createMessage',{
        from: form_name.val(),
        text: messageTextBox.val()
    }, function(data) {
        console.log("Message form data acknowledged");
    });
    messageTextBox.val('');
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
