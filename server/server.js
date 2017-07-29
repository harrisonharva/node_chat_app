const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {User} = require('./utils/users');

const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;
var app = express();
// Create http server  to integrate socketIO with ExpressJS
var server = http.createServer(app);
var io = socketIO(server);
var users = new User();

// Set default path for templates and user interface files
app.use(express.static(publicPath));

/**
 * [Event handeler when user connected to the server]
 * @type {String}
 */
io.on('connection', (socket) => {
    console.log("New user connected");

    // // socket.emit from Admin to new user window in chat app
    // socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
    //
    // // socket.broadcast.emit from Admin to all the other user except new user to notify user joined
    // socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name required');
        }

        socket.join(params.room);
        //socket.leave(params.room);

        //io.emit -> io.to('any existing chat room').emit
        //socket.broadcast.emit -> socket.broadcast.to('any existing chat room').emit
        //socket.emit

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // socket.emit from Admin to new user window in chat app
        socket.emit('newMessage', generateMessage("Admin", `Welcome to the chat app`));

        // socket.broadcast.to().emit from Admin to all the user to notify user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} user joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log("createMessage: ", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(0);
    });

    socket.on("createLocationMessage", (geolocationData) => {
        console.log("createLocationMessage: ", geolocationData);
        io.emit("newLocationMessage", generateLocationMessage('Admin', geolocationData.latitude, geolocationData.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        console.log(socket.id);
        console.log(user);
        if(user) {
            console.log("In the condition");
            console.log(user[0].room);
            console.log(users.getUserList(user[0].room));
            io.to(user[0].room).emit('updateUserList', users.getUserList(user[0].room));
            // socket.broadcast.emit from Admin to all the other user except new user to notify user disconnected
            io.to(user[0].room).emit('newMessage', generateMessage("Admin", `${user[0].name} has left.`));
        }
        console.log("User was disconnected");
    });
});

app.get('/', (req, res) => {
    res.render(publicPath+'/index.html', {
		pageTitle: "Home page",
		welcomeMessage: "Welcome to my website xyz.",
	});
});

server.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});

module.exports = {app}
