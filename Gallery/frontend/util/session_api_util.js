var SessionServerActions = require('../actions/server_actions/session_server_actions');


module.exports = {
  fetchCurrentUser: function () {
    $.ajax({
      url: '/api/session',
      method: 'GET',
      success:  function (user) {
        SessionServerActions.logIn(user);
      }
    });
  },

  signUp: function (data) {
      $.ajax({
        method: 'POST',
        url: '/api/user',
        dataType: 'json',
        data: {user: {username: data.username,
                      password: data.password
                    }},
        success: function (user) {
          SessionServerActions.signUp(user);
        },
        error: function(errors) {

          SessionServerActions.receiveErrors(errors.responseText);
        }
      });
    },

    logIn: function (data) {
      $.ajax({
        method: "POST",
        url: '/api/session',
        dataType: 'json',
        data: {user: {username: data.username, password: data.password}},
        success: function (user) {
            SessionServerActions.logIn(user);
        },
        error: function(errors) {
          SessionServerActions.receiveErrors(errors.responseText);
        }
      });
    },

    logOut: function () {
    $.ajax({
      method: "DELETE",
      url: '/api/session',
      success: function () {
        SessionServerActions.logOut();
      }
    });
  }

};
