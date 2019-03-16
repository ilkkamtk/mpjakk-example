import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login} from '../util/MediaAPI';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    login(this.state.username, this.state.password).then(user => {
      console.log(user);
      this.props.setUser(user);
      localStorage.setItem('token', user.token);
      this.props.history.push('/');
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

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
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
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.func,
};

export default Login;