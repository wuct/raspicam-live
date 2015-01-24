var React = require('react');
var io = require('socket.io-client');
var VideoPlayer = require('./VideoPlayer.jsx');

var App = React.createClass({
	getInitialState() {
		return {
			buf: [],
			fps: 0
		}
	},
	componentDidMount() {
		console.log(`start listen on ${socketServerUrl}.`);
			
		// sockei.io setup
		var socket = io(socketServerUrl, {
			query: "type=web",
			transports: ['websocket']
		});
		var lastEmitAt = Date.now();
		socket.on('server:emitFrame', (data, done) => {
			done(); // To call this callback let the server knows we have received this frame.  
			this.setState({
				buf: data.buf,
				fps:  ~~(1e5/(Date.now() - lastEmitAt))/1e2
			});
			lastEmitAt = Date.now();
		});
	},

	render() {
		return (
			<div>
				<h1>Raspicam Live Beta</h1>
				<VideoPlayer
					fps={this.state.fps}
					buf={this.state.buf} />
			</div>
		);
	}

});
React.render(<App />, document.getElementById('app'));

module.exports = App;