module.exports = {
	context: __dirname + "/web/src",
	entry: "./entry.js",
	output: {
		publicPath: "http://local.host:8080/dist/",
		path: __dirname + "/web/dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony'
			}
		]
	},
}