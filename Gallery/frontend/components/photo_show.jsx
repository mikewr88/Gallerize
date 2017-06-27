import React from 'react';
import ImageStore from '../stores/image_store';
import ImageActions from '../actions/client_actions/image_actions';

class PhotoShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: ImageStore.find(parseInt(this.props.match.params.photoId)),
      title: ImageStore.find(parseInt(this.props.match.params.photoId)).title,
      description: ImageStore.find(parseInt(this.props.match.params.photoId)).description,
      edit: false
    }

    this.getPhoto = this.getPhoto.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
    this.edit = this.edit.bind(this);
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
    this.setState({edit: false});
  }

  edit(e) {
    e.preventDefault();
    this.setState({edit: true});
  }

  render() {
    var title = this.state.title;
    var description = this.state.description;
    var ShowPage;
    if (this.state.edit) {
      ShowPage = (
        <div id='photo-show-container'>
          <img id='photo-show-img' src={this.state.photo.image_url}></img>

          <div id='show-text-container'>
            <button className='show-button' onClick={this.changeInfo} value='Save'>Save</button>

            <label>Title:  <input type='text' value={title} onChange={this.titleChange} ></input></label>
            <label>Description:  <input type='text' value={description} onChange={this.descriptionChange} ></input></label>

          </div>
        </div>
      )
    }else {
      ShowPage = (
        <div id='photo-show-container'>
          <img id='photo-show-img' src={this.state.photo.image_url}></img>
          <div id='show-text-container'>
            <button className='show-button' onClick={this.edit}>Edit</button>

            <div className='show-text'>{title}</div>
            <div className='show-text'>{description}</div>

          </div>
        </div>
      )
    }
    return (
      <div id='show-page'>
      {ShowPage}
      </div>
    );
  }

}

export default PhotoShow;
