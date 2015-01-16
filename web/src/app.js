var io = require('../node_modules/socket.io-client/socket.io.js');
var ss = require('../node_modules/socket.io-stream/socket.io-stream.js');
// console.log(ss.createStream)
var socket = io.connect('http://local.host:3000/stream');
var canvas = document.getElementById('canvas');
canvas.width = 640;
canvas.height = 640;
var ctx = canvas.getContext('2d');

ss(socket).on('server:emitImage', function (stream) {
	var buf = [];
	stream.on('data', function (chunk) {
		console.log('data');
		buf.push(chunk);
		drawBuf(buf);
	});
	stream.on('end', function () {
		// console.log('finish', buf);
	});
});

function drawBuf(buf) {
	var blob = new Blob(buf, {type: 'image/jpeg'});
	var url = URL.createObjectURL(blob);
	var img = new Image();
	// console.log(blob)
	img.onload = function() {
		// console.log('draw')
	    ctx.drawImage(this, 0, 0);
	    URL.revokeObjectURL(url);
	};
	img.src = url;
};