// start server
var port = process.env.PORT || 3000;
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var findIndex = require('lodash.findindex');

server.listen(port, function() {
	console.log('Socket.io server started on port %s.', port);
});

// render index.html
var template = fs.readFileSync(path.resolve(__dirname + '/index.ejs'), { encoding: 'utf-8' });
var indexHtml = ejs.render(template, {
	env: process.env.NODE_ENV,
	port: port,
	pathToBundle: process.env.NODE_ENV !== 'dev'
		? '/dist/bundle.js'
		: 'http://local.host:8080/dist/bundle.js'
});

app.get('/', function (req, res) {
	res.send(indexHtml);
});
app.get('/dist/bundle.js', function (req, res) {
	res.sendFile(path.resolve(__dirname + '/../web/dist/bundle.js'));
});


// socket.io setup
var io = require('socket.io')(server);
var nsp = io.of('/stream');
var webSockets = [];
nsp.on('connection', function (socket) {
	console.log(socket.handshake.query);
	
	// register web user
	if ( 'web' === socket.handshake.query.type) {
		socket.isEmitting = false;
		socket.numOfSkipFrames = 0;
		webSockets.push(socket);
	}

	socket.on('client:emitFrame', function (data, done) {
		done(); // To call this callback let the client knows we have received this frame.  
		webSockets.forEach(function (socket) {
			if (socket.isEmitting) return socket.numOfSkipFrames++;
			socket.isEmitting = true;
			socket.emit('server:emitFrame', data, function() {
				console.log('%s has skipped %s frames.', socket.id, socket.numOfSkipFrames);
				socket.isEmitting = false;
				socket.numOfSkipFrames = 0;
			});
		});
	});

	socket.on('disconnect', function() {
		console.log('%s disconnected.', socket.id);
		if ( 'web' === socket.handshake.query.type) {
			webSockets.splice(findIndex(webSockets, {
				id: socket.id
			}), 1);
		}
	});
});
