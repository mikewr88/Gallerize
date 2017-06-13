var ImageServerActions = require('../actions/server_actions/image_server_actions');

module.exports = {
  createImage: function (image_url, user_id) {
    $.ajax({
      method: 'POST',
      url: 'api/photo',
      data: {photo: {image_url: image_url,
                     user_id: user_id,
                     description: 'test',
                     title: 'test photo'
                    }
          },
      success: function (photo) {
        console.log('photo saved');
      }
    });
  },

  fetchPhotos: function () {
    $.ajax({
      method: 'GET',
      url: 'api/photos',
      success: function (data) {
        ImageServerActions.receivePhotos(data.photos);

      }
    });
  }
};
