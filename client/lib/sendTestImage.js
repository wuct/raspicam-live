var fs = require('fs');
var ss = require('socket.io-stream');
var path = require('path');


module.exports = function (socket, interval) {
	var imgs = [
		path.resolve(__dirname + '/test1.jpg'),
		path.resolve(__dirname + '/test2.jpg'),
	];
	var i = 1;
	console.log('start emitting images for testing...');	
	function emitImage() {
		// console.log('client:emitImage ' + imgs[i]);
		i = i^1;
		var stream = ss.createStream();
		fs.createReadStream(imgs[i]).pipe(stream);
		ss(socket).emit('client:emitImage', stream, { name: imgs[i] });
	};
	emitImage();
	var interval = setInterval(emitImage, interval || 1000);
};