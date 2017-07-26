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
    socket.emit('newMessage', {
        from: 'test@example.com',
        text: 'Test description for testing data',
        createdAt: 123
    });
    socket.on('createMessage', (message) => {
        console.log("createMessage: ", message);
        console.log("from :"+message.from);
        console.log("text :"+message.text);
    });
    socket.on('disconnect', () => {
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
