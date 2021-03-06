var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');

var SessionStore = new Store(AppDispatcher);

var _currentUser, _authErrors = [];

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      SessionStore.login(payload.user);
      SessionStore.__emitChange();
      break;
    case SessionConstants.SIGNUP:
      SessionStore.signUp(payload.user);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      SessionStore.logout();
      SessionStore.__emitChange();
      break;
    case SessionConstants.ERROR:
      SessionStore.setErrors(payload.errors);
      SessionStore.__emitChange();
      break;
  }

};

SessionStore.login = function (user) {
  _currentUser = user;
  _authErrors = [];
};

SessionStore.signUp = function (user) {
  SessionStore.login(user);
};

SessionStore.logout = function () {
  _currentUser = null;
  _authErrors = [];
};

SessionStore.setErrors = function (errors) {
  _authErrors = JSON.parse(errors).message;

};

SessionStore.errors = function () {
  return _authErrors;
};

SessionStore.clearErrors = function () {
  _authErrors = [];
};

SessionStore.currentUser = function () {
  if (_currentUser) {
    return $.extend({}, _currentUser);
  }
};

module.exports = SessionStore;
