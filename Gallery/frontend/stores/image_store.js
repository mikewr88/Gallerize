var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ImageConstants = require('../constants/image_constants');
var ImageStore = new Store(AppDispatcher);

var _photos;
ImageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ImageConstants.PHOTOS_RECEIVED:
      ImageStore.receivePhotos(payload.photos);
      ImageStore.__emitChange();
      break;
  }

};

ImageStore.receivePhotos = function (photos) {
  _photos = photos;
};

ImageStore.allPhotos = function () {
  return _photos;
};

module.exports = ImageStore;
