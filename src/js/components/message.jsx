var React = require('react');
var ReactDOM = require('react-dom');

var Message = React.createClass({
  render: function () {
    return <h3>Message {this.props.params.id}</h3>
  }
});

module.exports = Message;