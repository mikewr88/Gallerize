import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';
import ImageActions from '../actions/client_actions/image_actions';
import Upload from './add_photo';
var Link = require('react-router-dom').Link;
import {Redirect} from 'react-router';

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
    var linkTo = '/';
    if (this.state.currentUser) {
      linkTo = '/my-photos'
      Nav = (
            <div id="logged-in-nav-container">
                <Upload setImage={this.uploadImage}/>
                <div id="logout-container">
                  <button  id='auth-link-button' className='logout' onClick={this.logOut.bind(this)} value='Log Out'>Log Out</button>
                </div>
              </div>
            )
    }else {
        Nav = (<div id='auth-link-container'>
                <Redirect to={'/'}/>

                  <Link to='/signup' id='auth-link-button'> Sign Up </Link>
                  <Link to='/login' id='auth-link-button'> Log In </Link>

              </div>
              )
    }

    return (
      <div id='nav-bar-container'>
      <div id='nav-title-container'>
      <Link to={linkTo} id='nav-title' className='underline'>Gallerize</Link>
      </div>
        {Nav}
       {this.props.children}
      </div>
    );
  }

}

export default Navbar;
