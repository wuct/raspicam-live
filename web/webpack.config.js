module.exports = {
	context: __dirname + "/src",
	entry: "./entry.js",
	output: {
		publicPath: "/dist",
		path: __dirname + "/dist",
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