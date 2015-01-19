var fs = require('fs');
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

		fs.readFile(imgs[i], function (err, buf) {
			if (err) return console.log(err);
			socket.emit('client:emitFrame', {
				name: imgs[i],
				buf: buf
			});
		});
	};

	emitImage();
	var interval = setInterval(emitImage, interval || 1000);
};