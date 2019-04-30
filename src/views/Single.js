import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia, getDescription} from '../util/MediaAPI';
import {Button} from '@material-ui/core';
import {StateContext} from '../contexts/StateContext';

class Single extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    getSingleMedia(id).then(pic => {
      this.context.setFile(pic);
    });
  }

  render() {
    return (
        <StateContext.Consumer>
          {context => (
              <React.Fragment>
                <Button onClick={this.props.history.goBack}>Back</Button>
                {console.log(context.file)}
                <h1>{context.file.title}</h1>
                {context.file.media_type.includes('image') &&
                <img src={context.uploadsUrl + context.file.filename}
                     alt={context.file.title}
                     style={{filter: `brightness(${context.filters.brightness}%) contrast(${context.filters.contrast}%) sepia(${context.filters.warmth}%) saturate(${context.filters.saturation}%)`}}
                />
                }
                {context.file.media_type.includes('video') &&
                <video src={context.uploadsUrl + context.file.filename}
                       controls
                />}
                {context.file.media_type.includes('audio') &&
                <audio src={context.uploadsUrl + context.file.filename}
                       controls
                />}
                <p>
                  {getDescription(context.file.description)}
                </p>
              </React.Fragment>
          )}
        </StateContext.Consumer>
    );
  }

}

Single.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

Single.contextType = StateContext;

export default Single;