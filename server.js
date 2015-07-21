var express = require('express');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

var app = express();
var port = process.env.PORT || 8888;
var server = app.listen(port);
var io = socketio.listen(server);
console.log("Listening on port 8888....");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var messages = [];

app.get('/messages', function (req, res){
    res.json(messages);
});

io.on('connection', function (socket) {

    console.log('Client connected');

    socket.on('disconnect', function() {
        console.log('Client disconnected');
    });

    socket.on('chat message', function(data) {
        messages.push(data);
        io.sockets.emit('new message', data);
    });

    socket.emit('chat history', messages);

});

