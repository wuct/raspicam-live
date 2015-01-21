var timelapse = process.argv[2] || 500;
module.exports = {
	mode: 'photo',
	width: 640,
	height: 640,
	output: "./temp/image.jpg",
	timelapse: timelapse,
	timeout: 9999999,
	quality: 10,
	burst: true
};