import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';

import {Redirect} from 'react-router';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: SessionStore.errors(),
      loggedIn: false
    } ;
    this.userChange = this.userChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.onChange);
    this.userListener = SessionStore.addListener(this.redirect);
  }

  componentWillUnmount() {
    this.sessionListener.remove();
    this.userListener.remove();
  }

  onChange() {
    this.setState({currentUser: SessionStore.currentUser(), errors: SessionStore.errors()});
  }

  userChange(event) {
    this.setState({username: event.target.value});
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  redirect() {
    if (SessionStore.currentUser()){

      this.setState({loggedIn: true});
    }
  }

  signUp(event) {
    event.preventDefault();
    SessionActions.signUp({
      username: this.state.username,
      password: this.state.password
    });

  }

  render() {
    var username = this.state.username;
    var password = this.state.password;
    var SignupPage;

    if (this.state.loggedIn) {
      SignupPage = (<Redirect to={'my-photos'}/>);
    }else (
      SignupPage = (
        <div id='login-container'>
        <div id='auth-text'>Create An Account And Get Started!</div>
        <form id='login-form'>
          <label id='auth-label'>Create a Username:  <input type='text' id='username-input' value={username} onChange={this.userChange} autoFocus>
          </input></label>

          <label id='auth-label'>Create a Password:  <input type='password' id='password-input' value={password} onChange={this.passwordChange}>
          </input></label>

          <button id='login-button' onClick={this.signUp} value='Create Account'>Create Account</button>
        </form>
        </div>
      )
    )
    return (
      <div>
        {SignupPage}
      </div>
    );
  }

}

export default SignUp;
