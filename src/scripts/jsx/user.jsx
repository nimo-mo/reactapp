var React = require('react');
var Header = require('./components/header');

var User = React.createClass({

	getInitialState: function () {
		return {
			user: {
				username: 'nimo',
				useremail: 'nimo.mo@wolaidai.com'
			}
		}
	},

	componentDidMount: function () {
		// console.log(1)
	},

	render: function() {
		var user = this.state.user;
		console.log(this.props)
		return (
			<div role="user" className="user">
				<Header />
				<div>{user.username}</div>
				<div>{user.useremail}</div>
			</div>
		);
	}

});

module.exports = User;