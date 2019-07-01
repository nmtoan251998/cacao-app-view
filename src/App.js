import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Auth from "./pages/Auth/Auth"

class App extends Component {
  render() {
    return (
      <Auth />
    )
  }
}

export default App;
