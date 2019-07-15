/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

import AuthContext from '../contexts/AuthContext';
import { AppContext } from '../contexts/CartContext';

class NavComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const guestScreens = (
            <div className="d-flex flex-column flex-md-row pl-3 pr-3 align-items-center">
              <NavItem>
                  <Link className="p-1 Auth-link" to="/auth/login">Login</Link>
              </NavItem>
              <NavItem>
                  <Link className="p-1 Auth-link" to="/auth/register">Register</Link>
              </NavItem>
            </div>
    );

    const userScreens = (
            <div className="d-flex flex-md-row pl-3 pr-3 align-items-center">
                <NavItem>
                <AuthContext.Consumer>
                  {({ logout }) => <Link to="#" onClick={() => logout()} >Logout</Link>}
                </AuthContext.Consumer>
                </NavItem>
            </div>
    );

    return (
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">logo</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                              <Link className="pl-2 pr-2" to="/">Sản phẩm</Link>
                            </NavItem>
                            <NavItem>
                              <Link className="pl-2 pr-2" to="/dat-hang">Đặt hàng</Link>
                            </NavItem>
                            <NavItem>
                              <Link className="pl-2 pr-2" to="#">Liên hệ</Link>
                            </NavItem>
                            <NavItem>
                              <Link className="pl-2 pr-2" to="#">Về chúng tôi</Link>
                            </NavItem>
                            <NavItem>
                              <AppContext.Consumer>
                                {({ CartItems }) => <Link className="pl-2 pr-2" to="#">
                                  Giỏ hàng ({CartItems.length})
                                  </Link>}
                              </AppContext.Consumer>
                            </NavItem>
                            <AuthContext.Consumer>
                                {({ isLogedIn }) => (
                                    <nav>
                                        {!isLogedIn ? guestScreens : userScreens}
                                    </nav>
                                )}
                            </AuthContext.Consumer>
                        </Nav>
                    </Collapse>
                </Navbar>
    );
  }
}

export default NavComponent;