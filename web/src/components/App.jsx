var React = require('react');
var io = require('socket.io-client');
var ss = require('socket.io-stream');

var VideoPlayer = require('./VideoPlayer.jsx');

var App = React.createClass({
	getInitialState: function() {
		return {
			buf: []
		}
	},
	componentDidMount: function() {
		var that = this;
		
		// sockei.io setup
		var socket = io('/stream', {
			query: "type=web",
			transports: ['websocket']
		});

		socket.on('server:emitImage', function (data) {
			console.log('received data', data);
			that.setState({ buf: data.buf });
		});
		// ss(socket).on('server:emitImage', function (stream, data) {
		// 	// console.log('received strem');
		// 	var buf = [];
		// 	stream.on('data', function (chunk) {
		// 		// console.log('data: ', chunk.length);
		// 		buf.push(chunk);
		// 	});
		// 	stream.on('end', function () {
		// 		// console.log('finish');
		// 		that.setState({
		// 			buf: buf
		// 		})
		// 	});
		// });
	},

	render: function() {
		return (
			<div>
				<h1>Raspicam Live</h1>
				<VideoPlayer buf={this.state.buf} />
			</div>
		);
	}

});
React.render(<App />, document.getElementById('app'));

module.exports = App;