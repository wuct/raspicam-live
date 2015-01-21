var fs = require('fs');
var path = require('path');


module.exports = function (socket, interval) {
	var imgs = [
		path.resolve(__dirname + '/test1.jpg'),
		path.resolve(__dirname + '/test2.jpg'),
	];
	var i = 1;
	var isEmiting = false;
	var numOfSkipFrames = 0;
	console.log('start emitting test frames ...');	
	function emitImage() {
		if (isEmiting) return numOfSkipFrames++;
		isEmiting = true;
		// console.log('client:emitImage ' + imgs[i]);
		i = i^1;

		fs.readFile(imgs[i], function (err, buf) {
			if (err) return console.log(err);
			socket.emit('client:emitFrame', {
				name: imgs[i],
				buf: buf
			}, function() {
				console.log('has skipped %s frames.', numOfSkipFrames);
				isEmiting = false;
				numOfSkipFrames = 0;
			});
		});
	};

	emitImage();
	var interval = setInterval(emitImage, interval || 1000);
};