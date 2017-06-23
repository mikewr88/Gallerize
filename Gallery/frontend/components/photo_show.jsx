import React from 'react';
import ImageStore from '../stores/image_store';
import ImageActions from '../actions/client_actions/image_actions';

class PhotoShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: ImageStore.find(parseInt(this.props.match.params.photoId)),
      title: ImageStore.find(parseInt(this.props.match.params.photoId)).title,
      description: ImageStore.find(parseInt(this.props.match.params.photoId)).description
    }

    this.getPhoto = this.getPhoto.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
  }

  componentDidMount() {
    this.imageListener = ImageStore.addListener(this.getPhoto);
  }

  getPhoto() {
    this.setState({photo: ImageStore.find(parseInt(this.props.match.params.photoId))});
  }

  titleChange(event) {
    this.setState({title: event.target.value});
  }

  descriptionChange(event) {
    this.setState({description: event.target.value});
  }

  changeInfo(e) {
    e.preventDefault();
    ImageActions.updateInfo({title: this.state.title, description: this.state.description, id: this.state.photo.id})
  }

  render() {
    var title = this.state.title;
    var description = this.state.description;
    return (
      <div id='photo-show-container'>
        <img id='photo-show-img' src={this.state.photo.image_url}></img>
        <label>Title:  <input type='text' value={title} onChange={this.titleChange} ></input></label>
        <label>Description:  <input type='text' value={description} onChange={this.descriptionChange} ></input></label>

        <button onClick={this.changeInfo} value='Done'>Done</button>
      </div>
    );
  }

}

export default PhotoShow;
