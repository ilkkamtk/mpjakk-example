import React, {Component} from 'react';
// import Table from '../components/Table';
import PropTypes from 'prop-types';
import ImageGrid from '../components/ImageGrid';
import {deleteMedia, getMediaFromUser} from '../util/MediaAPI';
import {StateContext} from '../contexts/StateContext';

class MyFiles extends Component {

  updateUserImages = () => {
    getMediaFromUser(this.context.user.user_id).then((pics) => {
      console.log(pics);
      this.context.setPicArray(pics);
    });
  };

  deleteFile = (id) => {
    console.log('delete', id);
    const cnfrm = window.confirm('Really? Delete?');
    if (!cnfrm) {
      return;
    }

    deleteMedia(id, localStorage.getItem('token')).then(response => {
      this.updateUserImages();
    }).catch(err => {
      console.log(err);
    });

  };

  componentDidMount() {
    if (!this.context.checkLogin()) {
      this.props.history.push('/');
    } else {
      this.updateUserImages();
    }
  }

  render() {
    return (
        <React.Fragment>
          {/* <Table picArray={this.picArray}/> */}
          <ImageGrid edit={true}
                     deleteFile={this.deleteFile}/>
        </React.Fragment>
    );
  }
}

MyFiles.propTypes = {
  history: PropTypes.object,
};

MyFiles.contextType = StateContext;

export default MyFiles;