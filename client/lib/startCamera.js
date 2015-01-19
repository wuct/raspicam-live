var fs = require('fs');
var ss = require('socket.io-stream');

function startCamera(socket) {
	var camera = new require("raspicam")({
		mode: 'timelapse',
		width: 640,
		height: 640,
		output: "./temp/image.jpg",
		timelapse: 0,
		timeout: 0,
		burst: true,
		//mode: 1 // bug 

	});
	camera.on("start", function (err, timestamp ){
		console.log("photo started at " + timestamp );
	});

	camera.on("read", function (err, timestamp, filename ){
		console.log("photo image captured with filename: " + filename );
		if (/~$/.test(filename)) return;

		var stream = ss.createStream();
		fs.createReadStream('./temp/' + filename).pipe(stream);
		ss(socket).emit('client:emitImage', stream, { name: filename });
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