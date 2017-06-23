var AppDispatcher = require('../../dispatcher/dispatcher');
var ImageConstants = require('../../constants/image_constants');

module.exports = {
  receivePhotos: function (photos) {
    console.log('receivePhotos');
    AppDispatcher.dispatch({
      actionType: ImageConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  },

  receivePhoto: function (photo) {
    console.log('receivePhoto');
    AppDispatcher.dispatch({
      actionType: ImageConstants.PHOTO_RECEIVED,
      photo: photo
    });
  },

  updatePhoto: function (photo) {
    AppDispatcher.dispatch({
      actionType: ImageConstants.PHOTO_UPDATE,
      photo: photo
    });
  },

  resetId: function () {
    console.log('reset');
    AppDispatcher.dispatch({
      actionType: ImageConstants.RESET_ID
    });
  }

};
