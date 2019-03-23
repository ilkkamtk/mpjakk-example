import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from '../util/MediaAPI';

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: {
      filename: 'b2db3cce51674aba84d9476a545c5cc4.jpg',
      title: 'Test',
    },
  };

  componentDidMount() {
    const {id} = this.props.match.params;
    getSingleMedia(id).then(pic => {
      console.log(pic);
      this.setState({file: pic});
    });
  }

  render() {
    return (
        <React.Fragment>
          <h1>{this.state.file.title}</h1>
          <img src={this.mediaUrl + this.state.file.filename}
               alt={this.state.file.title}/>
        </React.Fragment>
    );
  }

}

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;