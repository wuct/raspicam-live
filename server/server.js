// start server
var port = process.env.PORT || 3000
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(port, function() {
	console.log('Socket.io server started on port %s.', port);
});

app.get('/', function (req, res) {
	res.sendFile(path.resolve('./../web/index.html'));
});
app.get('/dist/bundle.js', function (req, res) {
	res.sendFile(path.resolve('./../web/dist/bundle.js'));
});



var ss = require('socket.io-stream');
// TODO: handle 11 listner
var webUserSockets = [];

io.of('/stream')
.on('connection', function (socket) {
	// register web user
	console.log(socket.handshake.query);
	if ( 'web' === socket.handshake.query.type) {
		socket.indexOfSockets = webUserSockets.length;
		webUserSockets.push(socket);
	}

	ss(socket).on('client:emitImage', function (incomingStream, data) {
		console.log('receiving stream.' + data.name);
		// emit to all web users
		webUserSockets.forEach(function (socket) {
			var outgoingStream = ss.createStream();
			ss(socket).emit('server:emitImage', outgoingStream, { name: data.name, from: 'client' });
			incomingStream.pipe(outgoingStream);
		});
	});

	socket.on('disconnect', function() {
		console.log('disconnected.');
		webUserSockets.splice(socket.indexOfSockets, 1);
	});
});
