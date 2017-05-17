import React from 'react';
import SessionStore from '../stores/session_store';
import SesionActions from '../actions/client_actions/session_actions';

class Login extends React.Component {
  getInitialState() {
    return {
      username: '',
      password: '',
      errors: SessionStore.errors()
    };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.onChange);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  onChange() {
    this.setState({currentUser: SessionStore.currentUser(), errors: SessionStore.errors()});
  },

  handleLogin(event) {
    event.preventDefault();
    SessionActions.logIn({
      username: this.state.username,
      password: this.state.password
    });
  },

  handleSignUp(event) {
    event.preventDefault();
    SessionActions.signUp({
      username: this.state.username,
      password: this.state.password
    });
  },

  render() {
    return (
      <div>
      
      </div>
    );
  }

}

export default Login;
