var React = require('react');
var MenuData = require('../../js/menuData');

var Menu = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	pushState: function (e) {
		this.context.router.push(e.target.href);
	},
	render: function() {
		var self = this;
		return (
			<div className="menu">
				<ul>
					{
						MenuData.map(function (item,index) {
							return (
								<li className="item" onTouchTap={self.pushState} key={index}>
									<a href={item.path} data-path={item.path}>{item.title}</a>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = Menu;