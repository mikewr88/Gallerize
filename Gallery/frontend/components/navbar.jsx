import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';
import ImageActions from '../actions/client_actions/image_actions';
import Upload from './add_photo';
var Link = require('react-router-dom').Link;
import Redirect from 'react-router';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: SessionStore.currentUser()

    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  logOut() {
    SessionActions.logOut();
  }

  componentWillMount() {
    this.sessionListener = SessionStore.addListener(this.getCurrentUser)
  }

  getCurrentUser() {
    this.setState({currentUser: SessionStore.currentUser()});
  }

  uploadImage(image_url) {
    var user_id = this.state.currentUser.id;
    ImageActions.createImage(image_url, user_id);
  }

  render() {
    var Nav;
    console.log(this.state.currentUser);
    if (this.state.currentUser) {
      Nav = (<div>
              <Upload setImage={this.uploadImage}/>
              <button onClick={this.logOut.bind(this)} value='Log Out'>Log Out</button>
            </div>)
    }else {
        Nav = (
                <ul>
                  <li><Link to='/signup'> Sign Up </Link></li>
                  <li><Link to='/login'> Log In </Link></li>
                </ul>

              )
    }

    return (
      <div>
      <h1 id='nav-title'>Gallerize</h1>
        {Nav}
       {this.props.children}
      </div>
    );
  }

}

export default Navbar;
