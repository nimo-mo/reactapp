var React = require('react');
var ReactDOM = require('react-dom');

var Inbox = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
});

module.exports = Inbox;