var React = require('react');
var Screen = require('./Screen.jsx');

var VideoPlayer = React.createClass({

	render: function() {
		return (
			<div>
				<Screen buf={this.props.buf}/>
			</div>
		);
	}

});

module.exports = VideoPlayer;