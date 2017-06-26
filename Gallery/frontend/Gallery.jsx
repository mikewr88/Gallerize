var React = require("react");
var ReactDOM = require("react-dom");
var Router = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var Modal = require('react-modal');

import SessionActions from './actions/client_actions/session_actions';

import Navbar from './components/navbar';
import LogIn from './components/login';
import SignUp from './components/signup';
import Landing from './components/landing';
import PhotoGallery from './components/photo_gallery';
import PhotoShow from './components/photo_show';


class App extends React.Component {
  componentWillMount() {
    SessionActions.fetchCurrentUser();

  }

  render() {
    return(<div>
        <Route path='/' component={Navbar}/>
          <Route exact path='/' component={Landing}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/my-photos' component={PhotoGallery}/>
          <Route path='/photo/:photoId' component={PhotoShow}/>
      </div>);
  }
};

document.addEventListener("DOMContentLoaded", function (){
  Modal.setAppElement('#root');
  ReactDOM.render(<Router><App /></Router>,
                  document.getElementById("root"));
});
