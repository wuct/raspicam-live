var React = require('react');

// TODO: handle draw too slow

var Screen = React.createClass({
	componentDidMount: function() {
		this.ctx = this.getDOMNode().getContext('2d');
	},
	componentDidUpdate: function(prevProps, prevState) {
		this.drawBuf(this.props.buf);
	},
	drawBuf: function (buf) {
		var ctx = this.ctx;
		var blob = new Blob([buf], {type: 'image/jpeg'});
		var url = URL.createObjectURL(blob);
		var img = new Image();
		img.onload = function() {
		    ctx.drawImage(this, 0, 0);
		    URL.revokeObjectURL(url);
		};
		img.src = url;
	},
	render: function() {
		return (
			<canvas width={640} height={640} />
		);
	}

});

module.exports = Screen;