var React = require("react");
var ReactDOM = require("react-dom");

var Router = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

import Navbar from './components/navbar';
import LogIn from './components/login';
import SignUp from './components/signup';
import Landing from './components/landing';

class App extends React.Component {
  render() {
    return(<div>
        <Route path='/' component={Navbar}/>
          <Route exact path='/' component={Landing}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
      </div>);
  }
};

document.addEventListener("DOMContentLoaded", function (){
  ReactDOM.render(<Router><App /></Router>,
                  document.getElementById("root"));
});
