import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: SessionStore.errors()
    } ;

    this.userChange = this.userChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.signUp = this.signUp.bind(this);
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
    return (
      <div>
      <form>
        <label id='username'>Create a Username: <input type='text' value={username} onChange={this.userChange}>
        </input></label>

        <label id='password'>Create a Password: <input type='password' value={password} onChange={this.passwordChange}>
        </input></label>

        <button id='signup_button' onClick={this.signUp} value='Create Account'>Create Account</button>
      </form>
      </div>
    );
  }

}

export default SignUp;
