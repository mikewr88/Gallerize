import React from 'react';
import Photos from '../constants/landing_photos';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div id='landing-photo-container'>
      <img id="landing-photo" src="http://i.imgur.com/XDeL7Q4.jpg"></img>
      </div>
    );
  }

}

export default Landing;
