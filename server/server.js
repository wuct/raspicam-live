var fs = require('fs');
var io = require('socket.io').listen(3000, function(){
	console.log('yo start');
});
var ss = require('socket.io-stream');
var path = require('path');

io.of('/user').on('connection', function(socket) {
	console.log('connected.');
	ss(socket).on('profile-image', function(stream, data) {
		console.log('receiving file.')
		var filename = path.basename(data.name);
		stream.pipe(fs.createWriteStream(filename));
	});
});