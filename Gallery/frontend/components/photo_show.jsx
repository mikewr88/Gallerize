import React from 'react';
import ImageStore from '../stores/image_store';

class PhotoShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: ImageStore.find(parseInt(this.props.match.params.photoId))
    }
  }

  render() {
    return (
      <div id='photo-show-container'>
        <img src={this.state.photo.image_url}></img>
      </div>
    );
  }

}

export default PhotoShow;
