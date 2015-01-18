var fs = require('fs');
var ss = require('socket.io-stream');

var camera = new require("raspicam")({
	mode: 'photo',
	width: 640,
	height: 640,
	output: "./image.jpg",
	encoding: "jpg",
	timeout: 0,
});
camera.on("started", function( err, timestamp ){
	console.log("photo started at " + timestamp );
});

camera.on("read", function( err, timestamp, filename ){
	console.log("photo image captured with filename: " + filename );
});

camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
});

camera.start();

return;
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
