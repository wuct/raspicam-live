var React = require('react');

var FPS = React.createClass({
	render() {
		return (
			<span>
				{this.props.fps} fps
			</span>
		);
	}

});

module.exports = FPS;