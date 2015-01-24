var React = require('react');
var Screen = require('./Screen.jsx');
var FPS = require('./FPS.jsx');

var VideoPlayer = React.createClass({

	render() {
		return (
			<div>
				<FPS fps={this.props.fps}/>
				<Screen buf={this.props.buf}/>
			</div>
		);
	}

});

module.exports = VideoPlayer;