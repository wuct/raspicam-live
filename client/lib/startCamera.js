var fs = require('fs');

function startCamera(socket) {
	var camera = new require("raspicam")(require('../camera.config'));
	camera.on("start", function (err, timestamp ){
		console.log("photo started at " + timestamp );
	});
	var isEmiting = false;
	var numOfSkipFrames = 0;
	camera.on("read", function (err, timestamp, filename ){
		console.log("photo image captured with filename: " + filename );
		if (/~$/.test(filename)) return;
		if (isEmiting) return numOfSkipFrames++;
		isEmiting = true;
		fs.readFile('./temp/' + filename, function (err, buf) {
			if (err) return console.log(err);
			socket.emit('client:emitFrame', {
				name: filename,
				buf: buf
			}, function() {
				console.log('has skipped %s frames.', numOfSkipFrames);
				isEmiting = false;
				numOfSkipFrames = 0;
			});
		});
	});

	camera.on("exit", function (timestamp ){
		console.log("photo child process has exited at " + timestamp );
		camera.stop(function (err, timestamp) {
			console.log("photo stopped at " + timestamp );
		})
	});
	camera.on("stop", function (err, timestamp){
		console.log("timelapse child process has been stopped at " + timestamp);
	});

	camera.start();
};

module.exports = startCamera;