import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"

import AuthLogin from './pages/Auth/LoginBox';
import AuthRegister from './pages/Auth/RegisterBox';

class App extends Component {
  constructor(props) {
    super(props);
  };

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
          <a href="#">Logout</a>
        </li>
      </ul>
    )

    return (
      <Router>
        <div>
          <nav>
            {guestScreens}
          </nav>
          <Route path="/auth/login" exact component={AuthLogin} />
          <Route path="/auth/register" exact component={AuthRegister} />
        </div>
      </Router>
    );
  }
}

export default App;
