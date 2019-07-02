import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import { AuthProvider, AuthContext } from '../../contexts/AuthContext';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogedIn: true,
    }
  };

  onLogOut() {
    
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
          <AuthContext.Consumer>
            {({ logout }) => <a href="#" onClick={() => logout()}>Logout</a>}
            </AuthContext.Consumer>
          </li>
        </ul>
      
    )

    return (
      <AuthProvider>
        <Router>
          <div>
            <AuthContext.Consumer>
              {({user}) => {
                console.log(user)
                return (
                  <nav>
                    {!user ? guestScreens : userScreens}
                  </nav>
                )
              }}
            </AuthContext.Consumer>
            <Route path="/auth/login" exact component={AuthLogin} />
            <Route path="/auth/register" exact component={AuthRegister} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default Auth;
