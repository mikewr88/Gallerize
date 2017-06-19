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
    case ImageConstants.PHOTO_RECEIVED:
      ImageStore.receivePhoto(payload.photo);
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

module.exports = ImageStore;
