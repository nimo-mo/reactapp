var React = require('react');
var Header = require('./components/header');
var Menu = require('./components/menu');

var Index = React.createClass({
	render: function() {
		return (
			<div className="index">
				<Header />
				<Menu />
				index page
			</div>
		);
	}

});

module.exports = Index;