import React from 'react';

import {Redirect} from 'react-router';


class PhotoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo_show_id: null
    }
    this.photoShow = this.photoShow.bind(this);
  }

  photoShow() {
    var photoId = this.props.photo.id;
    this.setState({photo_show_id: photoId})
  }

  render() {

    var redirect;
    if (this.state.photo_show_id) {
      redirect = (<Redirect to={"/photo/" + this.state.photo_show_id}></Redirect>)
    }
    return (
      <li key={this.props.photo.id} >
        {redirect}
        <img className='photo-item-image' src={this.props.photo.image_url} onClick={this.photoShow}></img>
      </li>
    );
  }

}

export default PhotoItem;
