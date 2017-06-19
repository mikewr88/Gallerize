import React from 'react';
import ImageStore from '../stores/image_store';

import ImageActions from '../actions/client_actions/image_actions';
import PhotoItem from './photo_item';


class PhotoGallery extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    photos: []
  }
  this.updatePhotos = this.updatePhotos.bind(this);
}

componentWillMount() {
  this.getPhotos();

}

componentDidMount() {
  this.photoListener = ImageStore.addListener(this.updatePhotos);

}

getPhotos() {
  ImageActions.fetchPhotos();
}

updatePhotos() {
  this.setState({photos: ImageStore.allPhotos()})
}

  render() {

    var photosArray = [];
    var photos = this.state.photos;

    if (this.state.photos) {
      console.log(this.state.photos);
      photos.forEach( function (photo) {
        photosArray.push(<PhotoItem className='photo-index-item' key = {photo.id} photo={photo}></PhotoItem>)
      });
    };

    return (
      <div>
        <ul className="gallery_container">
          {photosArray}
        </ul>
      </div>
    );
  }

}

export default PhotoGallery;


//need to get the photos of the current logged in user to show in a gallery format.
// populate the imageStore and then pull the images from there.
// state.photos
