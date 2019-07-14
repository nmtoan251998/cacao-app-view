/* eslint-disable linebreak-style */

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthProvider from './contexts/AuthProvider';
import { CartContext } from './contexts/CartContext';
import Nav from './components/navbar';
import AuthLogin from './pages/Auth/AuthLogin';
import AuthRegister from './pages/Auth/AuthRegister';
import ListProducts from './components/ListProducts';
import Order from './pages/Order';

function App() {
  return (
    <AuthProvider>
      <CartContext>
        <Router>
          <div className="App">
            <Nav/>
          </div>
          <Route path="/" exact component={ListProducts} />
          <Route path="/auth/login" exact component={AuthLogin} />
          <Route path="/auth/register" exact component={AuthRegister} />
          <Route path="/dat-hang" exact component={Order} />
        </Router>
      </CartContext>
    </AuthProvider>
  );
}

export default App;
