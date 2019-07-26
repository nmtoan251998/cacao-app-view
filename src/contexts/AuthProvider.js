/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */

import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

export default class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    let isLogedIn = true;
    const token = localStorage.getItem('token');
    if (!token) {
      isLogedIn = false;
    }

    this.state = {
      user: undefined,
      token,
      isLogedIn,
      accountnameErr: undefined,
      passwordErr: undefined,
    };

    this.submitLogin = this.submitLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.showValidationErr = this.showValidationErr.bind(this);
    this.onKeySubmit = this.onKeySubmit.bind(this);
  }

  componentDidMount() {
    Axios.get('/api/users', {
      headers: {
        authorization: this.state.token,
      },
    })
      .then((response) => {
        this.setState({
          user: response.data.user,
          isLogedIn: true,
        });
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.setState({
      user: undefined,
      isLogedIn: false,
    });
  }

  showValidationErr(accountnameErr, passwordErr) {
    this.setState({
      accountnameErr,
      passwordErr,
    });
  }

  onKeySubmit(event, item) {
    if (event.keyCode !== 13) {
      this.showValidationErr(undefined, undefined);
      return;
    }

    this.submitLogin(item);
  }

  submitLogin(item) {
    if (!item.accountname) {
      this.showValidationErr('this field much be required!', '');
    } else if (!item.password) {
      this.showValidationErr(undefined, 'this field much be required!');
    } else {
      Axios.post('/auth/login', item)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          Axios.get('/api/users', {
            headers: {
              authorization: res.data.token,
            },
          })
            .then((response) => {
              this.setState({
                user: response.data.user,
                isLogedIn: true,
              });
            });
        })
        .catch(err => this.showValidationErr(err.response.data.error.wrongAccount, ''));
    }
  }

  render() {
    return (<AuthContext.Provider value={{
      user: this.state.user,
      isLogedIn: this.state.isLogedIn,
      accountnameErr: this.state.accountnameErr,
      passwordErr: this.state.passwordErr,
      submitLogin: this.submitLogin,
      onKeySubmit: this.onKeySubmit,
      logout: this.logout,
    }}>
        {this.props.children}
      </AuthContext.Provider>);
  }
}

AuthProvider.propTypes = {
  children: PropTypes.object,
};
