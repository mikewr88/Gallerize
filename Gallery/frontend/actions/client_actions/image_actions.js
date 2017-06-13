var ImageApiUtil = require('../../util/image_api_util');

module.exports = {
  createImage: function (image_url, user_id) {
    ImageApiUtil.createImage(image_url, user_id);
  },

  fetchPhotos: function () {
    ImageApiUtil.fetchPhotos();
  }
};
