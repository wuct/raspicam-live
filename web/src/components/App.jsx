var React = require('react');
var io = require('socket.io-client');

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

		socket.on('server:emitFrame', function (data) {
			// console.log('received data', data);
			that.setState({ buf: data.buf });
		});
	},

	render: function() {
		return (
			<div>
				<h1>Raspicam Live Beta</h1>
				<VideoPlayer buf={this.state.buf} />
			</div>
		);
	}

});
React.render(<App />, document.getElementById('app'));

module.exports = App;