var React = require("react");
var ReactDOM = require("react-dom");

var Router = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

import Navbar from './components/navbar';


class App extends React.Component {
  render() {
    return(<div>Hello
      <Route path='/' component={Navbar}></Route>
      </div>);
  }
};

document.addEventListener("DOMContentLoaded", function (){
  ReactDOM.render(<Router><App /></Router>,
                  document.getElementById("root"));
});
