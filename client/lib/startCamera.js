var fs = require('fs');

function startCamera(socket) {
	var camera = new require("raspicam")({
		mode: 'photo',
		width: 640,
		height: 640,
		output: "./temp/image.jpg",
		timelapse: 100,
		timeout: 9999999,
		quality: 10,
		burst: true,
		//mode: 1 // bug 

	});
	camera.on("start", function (err, timestamp ){
		console.log("photo started at " + timestamp );
	});

	camera.on("read", function (err, timestamp, filename ){
		console.log("photo image captured with filename: " + filename );
		if (/~$/.test(filename)) return;

		fs.readFile('./temp/' + filename, function (err, buf) {
			if (err) return console.log(err);
			socket.emit('client:emitFrame', {
				name: filename,
				buf: buf
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