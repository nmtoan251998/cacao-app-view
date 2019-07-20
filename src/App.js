/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthProvider from './contexts/AuthProvider';
import { CartContext } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import Nav from './components/navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import AuthLogin from './pages/Auth/AuthLogin';
import AuthRegister from './pages/Auth/AuthRegister';
import Order from './pages/Order';
import Cart from './pages/Cart';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartContext>
          <Router>
            <div className="App">
              <Nav/>
            </div>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search}/>
            <Route path="/dat-hang" exact component={ListProducts} />
            <Route path="/gio-hang" exact component={Cart} />
            <Route path="/auth/login" exact component={AuthLogin} />
            <Route path="/auth/register" exact component={AuthRegister} />
          </Router>
        </CartContext>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
