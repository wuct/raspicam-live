var React = require('react');
var Screen = require('./Screen.jsx');
var FPS = require('./FPS.jsx');

var VideoPlayer = React.createClass({

	render() {
		return (
			<div>
				<div style={{width: 90, textAlign: 'right'}}>
					<FPS fps={this.props.fps}/>
				</div>
				<Screen buf={this.props.buf}/>
			</div>
		);
	}

});

module.exports = VideoPlayer;