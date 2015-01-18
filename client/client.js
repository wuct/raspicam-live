var fs = require('fs');
var ss = require('socket.io-stream');

var SERVER_URL = process.env.SERVER_URL || 'http://local.host:3000';
var socket = require('socket.io-client')(SERVER_URL + '/stream', {
		query: "type=client",
		transports: ['websocket']
});

socket.on('connect_error', function(){
	console.log('Connection Failed');
});
socket.on('disconnect', function () {
	console.log('Disconnected');
});
socket.on('connect', function(){
	console.log('Connected.');
	var stream = ss.createStream();

	var imgs = ['test1.jpg', 'test2.jpg'];
	var i = 0;

	// emit image stream
	console.log('start emitting...');
	function emitImage() {
		// console.log('client:emitImage ' + imgs[i]);
		i = i^1;
		var stream = ss.createStream();
		fs.createReadStream(imgs[i]).pipe(stream);
		ss(socket).emit('client:emitImage', stream, { name: imgs[i] });
	}

	emitImage();
	var interval = setInterval(emitImage, 1000);
});
