
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Nav from "./components/navbar";
import AuthLogin from './pages/Auth/AuthLogin';
import AuthRegister from './pages/Auth/AuthRegister';
import ListProducts from './components/ListProducts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Nav/>
        </div>
        <Route path="/auth/login" exact component={AuthLogin} />
        <Route path="/auth/register" exact component={AuthRegister} />
      </Router>
    </AuthProvider>
  );
}

export default App;
