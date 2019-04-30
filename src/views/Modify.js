import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button, CircularProgress} from '@material-ui/core';
import './css/Upload.css';
import ImageEditor from '../components/ImageEditor';
import {
  getSingleMedia,
  getDescription,
  modify,
} from '../util/MediaAPI';
import {StateContext} from '../contexts/StateContext';

class Modify extends Component {

  componentDidMount() {
    console.log('modify', this.context.file);
    const {id} = this.props.match.params;
    getSingleMedia(id).then(pic => {
      this.context.setFile(pic);
    });
  }

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    this.context.fileFromInput(name, value);
  };

  handleFileSubmit = (evt) => {
    console.log(evt);
    this.context.setLoading(true);
    const data = {
      title: this.context.file.title,
      description: `[d]${getDescription(
          this.context.file.description)}[/d][f]${JSON.stringify(
          this.context.filters)}[/f]`,
    };

    modify(this.context.file.file_id, data, localStorage.getItem('token'))
        .then(json => {
          console.log(json);
          setTimeout(() => {
            this.context.setLoading(false);
            this.context.resetFile();
            this.props.history.push('/my-files');
          }, 2000);

        })
        .catch(err => {
          console.log('error', err);
        });
  };

  render() {
    return (
        <StateContext.Consumer>
          {context => (
              <React.Fragment>
                <h1>Modify</h1>
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
                                 value={getDescription(
                                     context.file.description)}
                                 onChange={this.handleInputChange}
                                 validators={['required', 'minStringLength:3']}
                                 errorMessages={[
                                   'this field is required',
                                   'minimum 3 charaters']}
                                 fullWidth
                                 multiline
                                 rows={3}/>
                  <Button type="submit" variant="contained"
                          color="primary">Save&nbsp;&nbsp;{context.loading &&
                  <CircularProgress size={20} color="secondary"/>}</Button>
                </ValidatorForm>
                {context.file.media_type === 'image' &&
                <ImageEditor/>
                }
              </React.Fragment>
          )}
        </StateContext.Consumer>
    );
  }
}

Modify.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

Modify.contextType = StateContext;

export default Modify;
