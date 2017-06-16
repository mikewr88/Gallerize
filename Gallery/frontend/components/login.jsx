import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';

import {Redirect} from 'react-router';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: SessionStore.errors(),
      loggedIn: false
    };
    this.userChange = this.userChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.logIn = this.logIn.bind(this);
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

  logIn(event) {
    event.preventDefault();
    SessionActions.logIn({
      username: this.state.username,
      password: this.state.password
    });
  }

  render() {
    var username = this.state.username;
    var password = this.state.password;
    var LoginPage;
    if (this.state.loggedIn) {
      LoginPage = (<Redirect to={'my-photos'}/>);
    }else {
      LoginPage = (
        <div id='login-container'>
          <div id='auth-text'>Already Have An Account?</div>
          <form id='login-form'>
            <label>Username:  <input type='text' id='username-input' value={username} onChange={this.userChange} autoFocus>
            </input></label>

            <label>Password:  <input type='password' id='password-input' value={password} onChange={this.passwordChange}>
            </input></label>
            <button id='login-button' onClick={this.logIn} value='Log In'>Log In</button>
          </form>
        </div>
      )
    }
    return (<div>
      {LoginPage}
      </div>
    );
  }

}

export default Login;
