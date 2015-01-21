// start server
var port = process.env.PORT || 3000
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

server.listen(port, function() {
	console.log('Socket.io server started on port %s.', port);
});

// render index.html
var template = fs.readFileSync(path.resolve(__dirname + '/index.ejs'), { encoding: 'utf-8' });
var indexHtml = ejs.render(template, {
	pathToBundle: process.env.NODE_ENV !== 'dev'
		? '/dist/bundle.js'
		: 'http://local.host:8080/dist/bundle.js'
});

app.get('/', function (req, res) {
	res.send(indexHtml);
});
app.get('/dist/bundle.js', function (req, res) {
	res.sendFile(path.resolve('./../web/dist/bundle.js'));
});


// socket.io setup
var io = require('socket.io')(server);
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
