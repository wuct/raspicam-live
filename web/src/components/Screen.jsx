var React = require('react');

// TODO: handle draw too slow

var Screen = React.createClass({
	componentDidMount() {
		this.ctx = this.getDOMNode().getContext('2d');
	},
	componentDidUpdate(prevProps, prevState) {
		this.drawBuf(this.props.buf);
	},
	drawBuf(buf) {
		var blob = new Blob([buf], {type: 'image/jpeg'});
		var url = URL.createObjectURL(blob);
		var img = new Image();
		img.onload = () => {
		    this.ctx.drawImage(img, 0, 0);
		    URL.revokeObjectURL(url);
		};
		img.src = url;
	},
	render() {
		return (
			<canvas width={640} height={640} />
		);
	}

});

module.exports = Screen;