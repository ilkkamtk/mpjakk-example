import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button, CircularProgress} from '@material-ui/core';
import TextField from '@material-ui/core/es/TextField/TextField';
import './css/Upload.css';
import ImageEditor from '../components/ImageEditor';
import {upload} from '../util/MediaAPI';
import {StateContext} from '../contexts/StateContext';

class Upload extends Component {
  fr = new FileReader();

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  componentDidMount() {
    this.context.resetFile();
    this.fr.addEventListener('load', () => {
      this.context.setFileData(this.fr.result);
    });
  }

  handleFileChange = (evt) => {
    evt.persist();
    console.log(evt.target.files[0]);
    this.fr.readAsDataURL(evt.target.files[0]);
    this.context.fileChange(evt);
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.context.fileFromInput(name, value);
  };

  handleFileSubmit = (evt) => {
    console.log(evt);
    this.context.setLoading(true);
    const fd = new FormData();
    fd.append('title', this.context.file.title);
    const description = `[d]${this.context.file.description}[/d][f]${JSON.stringify(
        this.context.filters)}[/f]`;
    fd.append('description', description);
    fd.append('file', this.context.file.filedata);

    upload(fd, localStorage.getItem('token')).then(json => {
      console.log(json);
      setTimeout(() => {
        this.props.history.push('/home');
        this.context.updateImages();
        this.context.setLoading(true);
      }, 2000);

    });
  };

  render() {
    return (
        <StateContext.Consumer>
          {context => (
              <React.Fragment>
                <h1>Upload</h1>
                <ValidatorForm instantValidate={false}
                               onSubmit={this.handleFileSubmit}
                               onError={errors => console.log(errors)}>
                  <TextValidator name="title" label="Title"
                                 value={context.file.title}
                                 onChange={this.handleInputChange}
                                 validators={['required', 'minStringLength:3']}
                                 errorMessages={[
                                   'this field is required',
                                   'minimum 3 charaters']}
                                 fullWidth/>
                  <TextValidator name="description" label="Description"
                                 value={context.file.description}
                                 onChange={this.handleInputChange}
                                 validators={['required', 'minStringLength:3']}
                                 errorMessages={[
                                   'this field is required',
                                   'minimum 3 charaters']}
                                 fullWidth
                                 multiline
                                 rows={3}/>
                  <TextField name="filedata" label="File"
                             type="file"
                             onChange={this.handleFileChange}
                             fullWidth/>
                  <Button type="submit" variant="contained"
                          color="primary">Upload&nbsp;&nbsp;{context.loading &&
                  <CircularProgress size={20} color="secondary"/>}</Button>
                </ValidatorForm>
                {context.file.imageData !== null &&
                context.type.includes('image') &&
                <ImageEditor/>
                }
              </React.Fragment>
          )}
        </StateContext.Consumer>
    );
  }
}

Upload.propTypes = {
  history: PropTypes.object,
  updateImages: PropTypes.func,
};

Upload.contextType = StateContext;

export default Upload;
