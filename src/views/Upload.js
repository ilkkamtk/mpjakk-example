import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import red from '@material-ui/core/colors/red';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    width: '50%',
    padding: '1rem',
  },
  button: {
    margin: theme.spacing.unit,
  },
  alert: {
    color: red[500],
  },
});

class Upload extends Component {

  apiURL = 'http://media.mw.metropolia.fi/wbma/media';

  form = React.createRef();

  state = {
    file: {
      title: '',
      description: '',
      data: '',
    },
    message: '',
  };

  handleUploadSubmit = (evt) => {
    evt.preventDefault();
    const fd = new FormData();
    console.log(fd);
    fd.append('title', this.state.file.title);
    fd.append('description', this.state.file.description);
    fd.append('file', this.state.file.data);
    const settings = {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      body: fd,
    };
    fetch(this.apiURL, settings).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result);
      this.props.updateImages();
      this.props.history.push('/home');
    });
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        [name]: value,

      },
    }));

  };

  handleFileChange = (evt) => {
    evt.persist();
    console.log(evt.target.files[0]);
    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        data: evt.target.files[0],
      },
    }));
  };

  render() {
    const {classes} = this.props;
    return (
        <div className={classes.container}>
          <h1>Register</h1>
          <form onSubmit={this.handleUploadSubmit}>
            <input name="title" id="title"
                   label="Title"
                   value={this.state.file.title}
                   onChange={this.handleInputChange}/>
            <textarea name="description"
                      id="description"
                      label="Description"
                      value={this.state.file.description}
                      onChange={this.handleInputChange}></textarea>
            <input name="file"
                   id="file"
                   label="File"
                   type="file"
                   value={this.state.file.filename}
                   onChange={this.handleFileChange}/>
            <Button className={classes.button} variant="contained"
                    color="primary" type="submit">
              <Send/>&nbsp;Upload
            </Button>
          </form>
          <p className={classes.alert}>
            {this.state.message}
          </p>
        </div>
    );
  }
}

Upload.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  updateImages: PropTypes.func,
};

export default withStyles(styles)(Upload);