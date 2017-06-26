var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ImageConstants = require('../constants/image_constants');
var ImageStore = new Store(AppDispatcher);

var _photos = {}, _newPhotoId = null;
ImageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ImageConstants.PHOTOS_RECEIVED:
      ImageStore.receivePhotos(payload.photos);
      ImageStore.__emitChange();
      break;
    case ImageConstants.PHOTO_RECEIVED:
      ImageStore.receivePhoto(payload.photo);
      ImageStore.__emitChange();
      break;
    case ImageConstants.RESET_ID:
      ImageStore.resetId();

      break;
    case ImageConstants.PHOTO_UPDATE:
      ImageStore.updatePhoto(payload.photo);
      ImageStore.__emitChange();
      break;
  }

};

ImageStore.receivePhotos = function (photos) {
  _photos = {};
  photos.forEach(function (photo) {
    _photos[photo.id] = photo;
  });
};

ImageStore.receivePhoto = function (photo) {
  _photos[photo.id] = photo;
  _newPhotoId = photo.id;
};

ImageStore.updatePhoto = function (photo) {
  _photos[photo.id] = photo;
}

ImageStore.newPhotoId = function () {
  return _newPhotoId;
};

ImageStore.allPhotos = function () {
  var photos = [];
  for (var id in _photos) {
    photos.push(_photos[id]);
  }
  return photos;
};

ImageStore.find = function (photoId) {
  if (typeof _photos === 'undefined') {
    return {};
  }
  return Object.assign({}, _photos[photoId]);
};

ImageStore.resetId = function () {
  _newPhotoId = null;
};

module.exports = ImageStore;
