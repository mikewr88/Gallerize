import React from 'react';

class AddPhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {thumbnail: null};

    this.upload = this.upload.bind(this);
  }

  upload(e) {
    e.preventDefault();
    window.cloudinary.openUploadWidget(window.cloudinary_options, function(error, results){
      if(!error){
        this.setState({thumbnail: results[0].url});
        this.props.setImage(results[0].url);
      }
    }.bind(this));
  }

  render() {
    var thumbnail;
    if (this.state.thumbnail) {
      thumbnail = (<img id='thumbnail' src={this.state.thumbnail}></img>);
    }
    return (
      <div id='upload-button-container-container'>
      <div className="upload-button-container">
        <button id="auth-link-button" className="underline" onClick={this.upload}>Upload Photo</button>
      </div>
    </div>
    );
  }

}

export default AddPhoto;
