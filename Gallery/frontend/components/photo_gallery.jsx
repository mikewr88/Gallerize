import React from 'react';
import ImageStore from '../stores/image_store';

import Masonry from 'react-masonry-component';

import ImageActions from '../actions/client_actions/image_actions';
import PhotoItem from './photo_item';


var MasonryOptions = {
  isFitWidth: true
};

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
      photos.forEach( function (photo) {
        photosArray.push(<PhotoItem className='photo-index-item' key = {photo.id} photo={photo}></PhotoItem>)
      });
    };

    return (
      <div id='masonry-container'>
        <Masonry elementType={'ul'} className={'gallery_container'} options={MasonryOptions} disableImagesLoaded={false}>
          {photosArray}
        </Masonry>
      </div>
    );
  }

}

export default PhotoGallery;
