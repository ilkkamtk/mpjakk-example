import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from '../util/MediaAPI';

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: 'http://placekitten.com/200/200',
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
    return (
        <React.Fragment>
          <h1>{this.state.file.title}</h1>
          <img src={this.mediaUrl + this.state.file.filename}
               alt={this.state.file.title}
               style={{filter: `brightness(${this.state.filters.brightness}%) contrast(${this.state.filters.contrast}%) sepia(${this.state.filters.warmth}%) saturate(${this.state.filters.saturation}%)`}}
          />
          <p>
            {this.getDescription(this.state.file.description)}
          </p>
        </React.Fragment>
    );
  }

}

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;