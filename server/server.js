var fs = require('fs');
var io = require('socket.io').listen(3000);
var ss = require('socket.io-stream');
var path = require('path');

var webUserSockets = [];

io.of('/stream')
.on('connection', function(socket) {

	// register web user
	if ( 'web' === socket.handshake.query.type) {
		webUserSockets.push(socket);
	}

	ss(socket).on('client:emitImage', function (incomingStream, data) {
		// console.log('receiving stream.' + data.name);
		// emit to all web users
		webUserSockets.forEach(function (socket) {
			var outgoingStream = ss.createStream();
			ss(socket).emit('server:emitImage', outgoingStream, { name: data.name, from: 'client' });
			incomingStream.pipe(outgoingStream);
		});
	});

	socket.on('disconnect', function() {
		console.log('disconnected.');
	});
});