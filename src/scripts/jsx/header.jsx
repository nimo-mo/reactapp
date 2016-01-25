var React = require('react');

var Header = React.createClass({

	render: function() {
		return (
			<div className="header">
				<ul>
					<li className="item"><a href="/index">index</a></li>
					<li className="item"><a href="/about">about</a></li>
					<li className="item"><a href="/users">users</a></li>
				</ul>
			</div>
		);
	}

});

module.exports = Header;