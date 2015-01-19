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

var nsp = io.of('/stream');
nsp.on('connection', function (socket) {
	// register web user
	// console.log(socket.handshake.query);
	if ( 'web' === socket.handshake.query.type) {
		socket.join('web');
	}

	socket.on('client:emitFrame', function (data) {
		// console.log('receiving')
		// console.log(data);
		nsp.to('web').emit('server:emitFrame', data);
	});

	socket.on('disconnect', function() {
		console.log('disconnected.');
	});
});
