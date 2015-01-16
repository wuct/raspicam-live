var fs = require('fs');
var io = require('socket.io').listen(3000);
var ss = require('socket.io-stream');
var path = require('path');

io
.of('/stream')
.on('connection', function(socket) {

	console.log('connected.');
	ss(socket).on('profile-image', function(stream, data) {
		console.log('receiving file.')
		var filename = path.basename(data.name);
		stream.pipe(fs.createWriteStream(filename));
	});

	var imgs = ['test1.jpg', 'test2.jpg'];
	var i = 0;
	// emit image stream
	function emitImage() {
		console.log('server:emitImage ' + imgs[i]);
		i = i^1;
		var stream = ss.createStream();
		fs.createReadStream(imgs[i]).pipe(stream);
		ss(socket).emit('server:emitImage', stream, { name: imgs[i] });
	}

	emitImage();
	var interval = setInterval(emitImage, 10000);

	socket.on('disconnect', function() {
		console.log('disconnected.');
		clearInterval(interval);
	});
})
