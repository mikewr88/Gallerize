import React from 'react';
import ImageStore from '../stores/image_store';
import ImageActions from '../actions/client_actions/image_actions';

class PhotoShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: ImageStore.find(parseInt(this.props.match.params.photoId))
    }

    this.getPhoto = this.getPhoto.bind(this);
  }

  componentDidMount() {
    this.imageListener = ImageStore.addListener(this.getPhoto);
  }

  getPhoto() {
    this.setState({photo: ImageStore.find(parseInt(this.props.match.params.photoId))});
  }

  render() {
    return (
      <div id='photo-show-container'>
        <img id='photo-show-img' src={this.state.photo.image_url}></img>
      </div>
    );
  }

}

export default PhotoShow;
