var timelapse = process.argv[2] || 150;
module.exports = {
	mode: 'photo',
	width: 640,
	height: 640,
	output: "./temp/image.jpg",
	timelapse: timelapse,
	timeout: 9999999,
	quality: 4,
	burst: true
};