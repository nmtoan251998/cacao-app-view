import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthLogin from './LoginBox';
import AuthRegister from './RegisterBox';

class Auth extends Component {
  constructor(props) {
    super(props);

    let isLogedIn = true
    let token = localStorage.getItem("token");
    if(token === null) {
      isLogedIn = false
    }

    this.state = {
      isLogedIn
    }
  };

  onLogOut() {
    localStorage.removeItem("token");
    this.setState({isLogedIn: false})
  }

  render() {
    const guestScreens = (
      <ul>
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
        <li>
          <Link to="/auth/register">Register</Link>
        </li>
      </ul>
    )

    const userScreens = (
      <ul>
        <li>
          <a href="#" onClick={this.onLogOut.bind(this)}>Logout</a>
        </li>
      </ul>
    )

    return (
      <Router>
        <div>
          <nav>
            {this.state.isLogedIn ? userScreens : guestScreens}
          </nav>
          <Route path="/auth/login" exact component={AuthLogin} />
          <Route path="/auth/register" exact component={AuthRegister} />
        </div>
      </Router>
    );
  }
}

export default Auth;
