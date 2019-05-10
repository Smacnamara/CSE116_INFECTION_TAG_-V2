var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var players = {};

app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

app.get("/game", function (req, res) {
    res.sendFile(__dirname + "/public/js/game.js");
});

io.on('connection', function (socket) {
    console.log('Player Connected');
    // create a new player and add it to our players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'human' : 'zombie'
    };
    console.log('Assigned as ' + players[socket.id].team)
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('disconnect', function () {
        console.log('Player Disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    socket.on('PlayerUpdated', function (Data) {
        players[socket.id].x = Data.x;
        players[socket.id].y = Data.y;
        players[socket.id].team = Data.team;

        socket.broadcast.emit('UpdatePlayer', players[socket.id])
        
    });
  });

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});