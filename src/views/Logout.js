import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StateContext} from '../contexts/StateContext';

class Logout extends Component {

  componentDidMount() {
    localStorage.removeItem('token');
    const defaultUser = {
      username: '',
    };
    this.context.setUser(defaultUser);
    this.props.history.push('/');
  }

  render() {
    return (
        <React.Fragment>
          <h1>Logout</h1>
        </React.Fragment>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.object,
};

Logout.contextType = StateContext;

export default Logout;