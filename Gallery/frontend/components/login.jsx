import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: SessionStore.errors()
    };
    this.userChange = this.userChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.logIn = this.logIn.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.onChange);
  }

  componentWillUnmount() {
    this.sessionListener.remove();
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
    return (
      <div>
        <form>
          <label id='username'>Username: <input type='text' value={username} onChange={this.userChange}>
          </input></label>

          <label id='password'>Password: <input type='password' value={password} onChange={this.passwordChange}>
          </input></label>
          <button id='login_button' onClick={this.logIn} value='Log In'>Log In</button>
        </form>
      </div>
    );
  }

}

export default Login;
