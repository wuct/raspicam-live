var fs = require('fs');
var io = require('socket.io-client');
var ss = require('socket.io-stream');

var socket = io.connect('http://local.host:3000/stream', { query: "type=client" });
var stream = ss.createStream();

var imgs = ['test1.jpg', 'test2.jpg'];
var i = 0;

// emit image stream
function emitImage() {
	console.log('server:emitImage ' + imgs[i]);
	i = i^1;
	var stream = ss.createStream();
	fs.createReadStream(imgs[i]).pipe(stream);
	ss(socket).emit('client:emitImage', stream, { name: imgs[i] });
}

emitImage();
var interval = setInterval(emitImage, 1000);