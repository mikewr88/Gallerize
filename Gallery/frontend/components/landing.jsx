import React from 'react';
import PhotosConstants from '../constants/landing_photos';

class Landing extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    var images = [];
    console.log(PhotosConstants);
    for (var i in PhotosConstants) {
      images.push(<img key={i} id="landing-photo" src={PhotosConstants[i]}></img>)
    };
    return (
      <div id='landing-photo-container'>
      {images}
      </div>
    );
  }

}

export default Landing;
