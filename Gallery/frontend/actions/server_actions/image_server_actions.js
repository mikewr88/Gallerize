var AppDispatcher = require('../../dispatcher/dispatcher');
var ImageConstants = require('../../constants/image_constants');

module.exports = {
  receivePhotos: function (photos) {
    AppDispatcher.dispatch({
      actionType: ImageConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  }
};
