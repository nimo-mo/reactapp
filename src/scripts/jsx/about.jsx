var React = require('react');
var Header = require('./components/header');

var About = React.createClass({

	render: function() {
		return (
			<div className="about">
				<Header />
				about page
			</div>
		);
	}

});

module.exports = About;