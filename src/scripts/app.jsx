// not using an ES6 transpiler
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Redirect = ReactRouter.Redirect;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var BrowserHistory = ReactRouter.browserHistory;
var $ = window.$ = require('./js/lib/zepto');
		require('./js/lib/zepto.cookie');
		require('react-tap-event-plugin')();

var Index = require('./jsx/index');
var About = require('./jsx/about');
var Users = require('./jsx/users');
var User = require('./jsx/user');
var NoMatch = require('./jsx/noMatch');

ReactDOM.render((
  <Router history={BrowserHistory}>
  	<Route path="/" components={Index}></Route>
    <Route path="index" components={Index}></Route>
    <Route path="about" components={About}></Route>
    <Route path="users" components={Users}></Route>
    <Route path="user/:userid" components={User}></Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));