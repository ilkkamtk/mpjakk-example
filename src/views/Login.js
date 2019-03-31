import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser} from '../util/MediaAPI';

class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    full_name: '',
  };

  handleLoginSubmit = (evt) => {
    evt.preventDefault();
    this.doLogin();
  };

  handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    register(this.state).then(user => {
      console.log(user);
      this.doLogin();
    });
  };

  doLogin = () => {
    login(this.state.username, this.state.password).then(response => {
      console.log(response);
      this.props.setUser(response.user);
      localStorage.setItem('token', response.token);
      this.props.history.push('/home');
    });
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      getUser(localStorage.getItem('token')).then(response => {
        this.props.setUser(response);
        this.props.history.push('/home');
      });
    }
  }

  render() {
    return (
        <React.Fragment>
          <h1>Login</h1>
          <form onSubmit={this.handleLoginSubmit}>
            <input type="text" name="username" placeholder="username"
                   value={this.state.username}
                   onChange={this.handleInputChange}/>
            <br/>
            <input type="password" name="password" placeholder="password"
                   value={this.state.password}
                   onChange={this.handleInputChange}/>
            <br/>
            <button type="submit">Login</button>
          </form>
          <h1>Register</h1>
          <form onSubmit={this.handleRegisterSubmit}>
            <input type="text" name="username" placeholder="username"
                   value={this.state.username}
                   onChange={this.handleInputChange}/>
            <br/>
            <input type="password" name="password" placeholder="password"
                   value={this.state.password}
                   onChange={this.handleInputChange}/>
            <br/>
            <input type="email" name="email" placeholder="email"
                   value={this.state.email}
                   onChange={this.handleInputChange}/>
            <br/>
            <input type="text" name="full_name" placeholder="full name"
                   value={this.state.full_name}
                   onChange={this.handleInputChange}/>
            <br/>
            <button type="submit">Login</button>
          </form>
        </React.Fragment>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.object,
};

export default Login;