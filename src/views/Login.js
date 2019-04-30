import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser, checkUser} from '../util/MediaAPI';
import {TextField, Button} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import red from '@material-ui/core/colors/red';

import {withStyles} from '@material-ui/core/styles';
import {StateContext} from '../contexts/StateContext';

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

class Login extends Component {

  handleLoginSubmit = (evt) => {
    evt.preventDefault();
    this.doLogin();
  };

  handleRegisterSubmit = () => {
    const user = this.context.login;
    // remove repeatPassword
    delete user.repeatPassword;
    register(user).then(user => {
      console.log(user);
      if (user.user_id === undefined) {
        this.context.setMessage(user.message);
        return;
      }
      this.doLogin();
    });
  };

  doLogin = () => {
    login(this.context.login.username, this.context.login.password)
        .then(response => {
          console.log(response);
          if (response.user !== undefined) {
            this.context.setUser(response.user);
            this.context.updateImages();
            localStorage.setItem('token', response.token);
            this.props.history.push('/home');
          } else {
            this.context.setMessage(response.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.context.userFromInput(name, value);

    if (name === 'username') {
      this.checkUsername(target.value);
    }
  };

  checkUsername = (username) => {
    checkUser(username).then((result) => {
      console.log(result.available);
      this.context.setValidUser(result.available);
    });
  };

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      getUser(localStorage.getItem('token')).then(response => {
        console.log(this.context);
        this.context.setUser(response);
        this.props.history.push('/home');
      });
    }
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === this.context.login.password;
    });
    ValidatorForm.addValidationRule('isUserAvailable', () => {
      return this.context.validUser;
    });
  }

  render() {
    const {classes} = this.props;
    return (
        <StateContext.Consumer>
          {context => (
              <div className={classes.container}><p></p>
                <div>
                  <Button color="primary" variant="contained"
                          onClick={context.toggleForm}>{(context.formToggler &&
                      `No account yet?
              Register.`) || `Login`}</Button>
                </div>
                {context.formToggler &&
                <React.Fragment>
                  <h1>Login</h1>
                  <form onSubmit={this.handleLoginSubmit}>
                    <TextField fullWidth required name="username" id="username"
                               label="Username"
                               value={context.login.username}
                               onChange={this.handleInputChange}/>
                    <TextField fullWidth required name="password"
                               type="password"
                               id="password"
                               label="Password"
                               value={context.login.password}
                               onChange={this.handleInputChange}/>
                    <Button className={classes.button} variant="contained"
                            color="primary" type="submit">
                      <Send/>&nbsp;Login
                    </Button>
                  </form>
                </React.Fragment>
                }

                {!context.formToggler &&
                <React.Fragment>
                  <h1>Register</h1>
                  <ValidatorForm instantValidate={false}
                                 onSubmit={this.handleRegisterSubmit}
                                 onError={errors => console.log(errors)}>
                    <TextValidator fullWidth name="username" id="username"
                                   label="Username"
                                   value={context.login.username}
                                   onChange={this.handleInputChange}
                                   validators={[
                                     'required',
                                     'minStringLength:3',
                                     'isUserAvailable']}
                                   errorMessages={[
                                     'this field is required',
                                     'minimum 3 charaters',
                                     'username not available']}/>
                    <TextValidator fullWidth name="password" type="password"
                                   id="password"
                                   label="Password"
                                   value={context.login.password}
                                   onChange={this.handleInputChange}
                                   validators={[
                                     'required',
                                     'minStringLength:5']}
                                   errorMessages={[
                                     'this field is required',
                                     'minimum 5 characters']}/>
                    <TextValidator fullWidth name="repeatPassword"
                                   type="password"
                                   id="repeatPassword"
                                   label="Repeat password"
                                   value={context.login.repeatPassword}
                                   onChange={this.handleInputChange}
                                   validators={['isPasswordMatch', 'required']}
                                   errorMessages={[
                                     'password mismatch',
                                     'this field is required']}/>
                    <TextValidator fullWidth name="email"
                                   id="email"
                                   label="email"
                                   value={context.login.email}
                                   onChange={this.handleInputChange}
                                   validators={['required', 'isEmail']}
                                   errorMessages={[
                                     'this field is required',
                                     'email is not valid']}/>
                    <TextField fullWidth name="full_name" id="full_name"
                               label="Full name"
                               value={context.login.full_name}
                               onChange={this.handleInputChange}/>
                    <Button className={classes.button} variant="contained"
                            color="primary" type="submit">
                      <Send/>&nbsp;Register
                    </Button>
                  </ValidatorForm>
                </React.Fragment>
                }
                <p className={classes.alert}>
                  {context.message}
                </p>
              </div>
          )}
        </StateContext.Consumer>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
};

Login.contextType = StateContext;

export default withStyles(styles)(Login);