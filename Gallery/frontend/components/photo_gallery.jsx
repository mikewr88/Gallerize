import React from 'react';
import ImageStore from '../stores/image_store';

import ImageActions from '../actions/client_actions/image_actions';


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
    console.log(this.state.photos);
    var photosArray = [];
    var photos = this.state.photos;

    photos.forEach( function (photo) {
      photosArray.push(<li key = {photo.id}><img className='photo_index' src={photo.image_url}></img></li>)
    });

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
