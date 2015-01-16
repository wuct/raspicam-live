module.exports = {
	context: __dirname + "/src",
	entry: "./app.js",
	output: {
		publicPath: "/dist",
		path: __dirname + "/dist",
		filename: "bundle.js"
	}
}