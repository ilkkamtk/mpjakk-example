import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from '../util/MediaAPI';

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: {
      filename: '',
      title: '',
      description: '[d][/d][f][/f]',
      media_type: 'image/jpg',
    },
    filters: {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    },
  };

  componentDidMount() {
    const {id} = this.props.match.params;
    getSingleMedia(id).then(pic => {
      console.log(pic);
      this.setState({
        file: pic,
        filters: this.getFilters(pic.description),
      });
    });
  }

  getFilters = (text) => {
    const pattern = '\\[f\\](.*?)\\[\\/f\\]';
    const re = new RegExp(pattern);
    // console.log(re.exec(value));
    try {
      return JSON.parse(re.exec(text)[1]);
    } catch (e) {
      console.log(e);
    }
  };

  getDescription = (text) => {
    const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
    const re = new RegExp(pattern);
    console.log(re.exec(text));
    try {
      return re.exec(text)[1];
    } catch (e) {
      return text;
    }
  };

  render() {
    const {title, description, filename, media_type} = this.state.file;
    const {brightness, contrast, saturation, warmth} = this.state.filters;
    return (
        <React.Fragment>
          {console.log(media_type)}
          <h1>{title}</h1>
          {media_type.includes('image') &&
          <img src={this.mediaUrl + filename}
               alt={title}
               style={{filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%) saturate(${saturation}%)`}}
          />}
          {media_type.includes('video') &&
          <video src={this.mediaUrl + filename}
                 controls
          />}
          {media_type.includes('audio') &&
          <audio src={this.mediaUrl + filename}
                 controls
          />}
          <p>
            {this.getDescription(description)}
          </p>
        </React.Fragment>
    );
  }

}

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;