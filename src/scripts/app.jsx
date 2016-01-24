// not using an ES6 transpiler
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Redirect = ReactRouter.Redirect;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;

var createHashHistory = require('history/lib/createHashHistory');

var history = createHashHistory({
  queryKey: false
});


var Index = require('./jsx/index');

ReactDOM.render((
  <Router history={history}>
    <Redirect from="/" to="/index" />
    <Route path="/index" components={Index}></Route>
  </Router>
), document.getElementById('app'));