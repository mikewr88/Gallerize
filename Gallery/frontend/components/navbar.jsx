import React from 'react';
import SessionStore from '../stores/session_store';
import ImageStore from '../stores/image_store';
import Modal from 'react-modal';

import SessionActions from '../actions/client_actions/session_actions';
import ImageActions from '../actions/client_actions/image_actions';
import ImageServerActions from '../actions/server_actions/image_server_actions';
import Upload from './add_photo';
import LogIn from './login';
import SignUp from './signup';
var Link = require('react-router-dom').Link;
import {Redirect} from 'react-router';

var ModalStyle = {
  overlay: {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0)'
  },
  content: {
    position                : 'absolute',
    top                     : '40px',
    left                    : '40px',
    right                   : '40px',
    bottom                  : '40px',
    border                  : '0px solid #ccc',
    backgroundColor         : 'rgba(255, 255, 255, 0)',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius            : '0px',
    outline                 : 'none',
    padding                 : '20px'

  }
}

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: SessionStore.currentUser(),
      uploadedPhoto: null,
      redirectToShow: false,
      loginModalOpen: false,
      signupModalOpen: false,
      loggedIn: false
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.getPhotoId = this.getPhotoId.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.openSignupModal = this.openSignupModal.bind(this);
    this.loginModalClose = this.loginModalClose.bind(this);
    this.signupModalClose = this.signupModalClose.bind(this);
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
    this.changeLoggedInFalse = this.changeLoggedInFalse.bind(this);
  }

  logOut() {
    SessionActions.logOut();
  }

  componentWillMount() {
    this.sessionListener = SessionStore.addListener(this.getCurrentUser);
    this.loggedInListener = SessionStore.addListener(this.changeLoggedIn);
    this.imageListener = ImageStore.addListener(this.getPhotoId);
  }

  getCurrentUser() {
    this.setState({currentUser: SessionStore.currentUser()});
  }

  uploadImage(image_url) {
    var user_id = this.state.currentUser.id;
    ImageActions.createImage(image_url, user_id);
  }

  getPhotoId() {
    var photoId = ImageStore.newPhotoId();
    if (photoId) {
      this.setState({uploadedPhoto: photoId, redirectToShow: true});
      ImageStore.resetId();
    }
  }

  openLoginModal() {
    this.setState({loginModalOpen: true, signupModalOpen: false, loggedIn: false});
  }

  openSignupModal() {
    this.setState({signupModalOpen: true, loginModalOpen: false, loggedIn: false});
  }

  loginModalClose() {
    this.setState({loginModalOpen: false, loggedIn: true});

  }

  signupModalClose() {
    this.setState({signupModalOpen: false, loggedIn: true});

  }

  getParent() {
    return document.queryselector('#root');
  }

  changeLoggedIn() {
    if (this.state.currentUser && this.props.match.path == '/') {
      this.setState({loggedIn: true});
    }
  }

  changeLoggedInFalse() {
    this.setState({loggedIn: false});
  }

  render() {
    var Nav;
    var MyPhotosRedirect;
    var linkTo = '/';
    var NavClass;
    if (this.state.currentUser) {
      linkTo = '/my-photos';
      if (this.state.loggedIn){
        console.log('should Redirect');
        MyPhotosRedirect = (<Redirect to={'my-photos'}></Redirect>)
        this.changeLoggedInFalse();

      }
      NavClass = '';
      Nav = (
            <div id="logged-in-nav-container">
            {MyPhotosRedirect}
                <Upload setImage={this.uploadImage}/>
                <div id="logout-container">
                  <button  id='auth-link-button' className='logout underline' onClick={this.logOut.bind(this)} value='Log Out'>Log Out</button>
                </div>
              </div>
            )
    }else {
        NavClass = 'hidden';
        Nav = (<div id='auth-link-container'>
                <Redirect to={'/'}/>
                  <Modal parentSelector={this.getParent} className='login-modal' isOpen={this.state.loginModalOpen} onRequestClose={this.loginModalClose} contentLabel='login modal' style={ModalStyle}>
                    <LogIn/>
                  </Modal>

                  <Modal parentSelector={this.getParent} className='signup-modal' isOpen={this.state.signupModalOpen} onRequestClose={this.signupModalClose} contentLabel='signup modal' style={ModalStyle}>
                    <SignUp/>
                  </Modal>

                  <button id='auth-link-button' className='underline' onClick={this.openLoginModal}>Log In</button>
                  <button id='auth-link-button' className='underline' onClick={this.openSignupModal}>Sign Up</button>

              </div>
              )
    }
     var redirect;
    if (this.state.redirectToShow && this.state.uploadedPhoto) {
      redirect = (<Redirect to={'/photo/' + this.state.uploadedPhoto}></Redirect>)

    }

    return (
      <div id='nav-bar-container' className = {NavClass}>
        {redirect}
      <div id='nav-title-container'>
      <Link to={linkTo} id='nav-title' className='underline'>GALLERYZE</Link>
      </div>
        {Nav}
       {this.props.children}
      </div>
    );
  }

}

export default Navbar;
