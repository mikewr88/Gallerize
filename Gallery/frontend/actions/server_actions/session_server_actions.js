var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionConstants = require('../../constants/session_constants');

module.exports = {
  logIn: function (user) {
    console.log('session login');
    AppDispatcher.dispatch({
        actionType: SessionConstants.LOGIN,
        user: user
    });
  },

  signUp: function (user) {
    console.log('session sign up');
    AppDispatcher.dispatch({
        actionType: SessionConstants.SIGNUP,
        user: user
    });
  },

  logOut: function () {
    console.log('session log out');
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  },

  receiveErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ERROR,
      errors: errors
    });
  }

};
