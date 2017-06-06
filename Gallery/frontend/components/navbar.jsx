import React from 'react';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/client_actions/session_actions';
var Link = require('react-router-dom').Link;

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: SessionStore.currentUser()
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
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

  render() {
    var Nav;
    if (this.state.currentUser) {
      Nav = (<button onClick={this.logOut.bind(this)} value='Log Out'>Log Out</button>)
    }else {
        Nav = (<ul>
                <li><Link to='/signup'> Sign Up </Link></li>
                <li><Link to='/login'> Log In </Link></li>
              </ul>)
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
