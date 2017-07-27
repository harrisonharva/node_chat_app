const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public' );
var app = express();
// Create http server  to integrate socketIO with ExpressJS
var server = http.createServer(app);
var io = socketIO(server);

// Set default path for templates and user interface files
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    // socket.emit from Admin to new user window in chat app
    socket.emit('NewConnection', {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().toTimeString()
    });

    // socket.broadcast.emit from Admin to all the other user except new user to notify user joined
    socket.broadcast.emit('NewConnection', {
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().toTimeString()
    });


    // socket.emit('newMessage', {
    //     from: 'test@example.com',
    //     text: 'Test description for testing data',
    //     createdAt: 123
    // });
    socket.on('createMessage', (message) => {
        console.log("createMessage: ", message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().toTimeString()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toTimeString()
        // });
    });

    socket.on('disconnect', () => {
        console.log("User was disconnected");
        // socket.emit from Admin to disconnected user window in chat app
        socket.emit('userDisconnected', {
            from: "Admin",
            text: "Good bye!!!",
            createdAt: new Date().toTimeString()
        });
        // socket.broadcast.emit from Admin to all the other user except new user to notify user disconnected
        socket.broadcast.emit('userDisconnected', {
            from: "Admin",
            text: "User disconnected from this conversation",
            createdAt: new Date().toTimeString()
        });
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
