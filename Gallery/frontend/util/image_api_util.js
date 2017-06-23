var ImageServerActions = require('../actions/server_actions/image_server_actions');

module.exports = {
  createImage: function (image_url, user_id) {
    $.ajax({
      method: 'POST',
      url: 'api/photos',
      data: {photo: {image_url: image_url,
                     user_id: user_id,
                     description: 'Add a Description',
                     title: 'Title'
                    }
          },
      success: function (photo) {
        ImageServerActions.receivePhoto(photo);
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
  },

  updateInfo: function (title, description, id) {
    $.ajax({
      method: 'PATCH',
      url: 'api/photos/' + id.toString() ,
      data: {photo: {
        title: title,
        description: description
      }},
      success: function (updatedPhoto) {
        ImageServerActions.updatePhoto(updatedPhoto);
      }
    });
  },

  resetId: function () {
    ImageServerActions.resetId();
  }
};
