import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    } from 'reactstrap';

import { AuthContext } from '../contexts/AuthContext';

class NavComponent extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        const guestScreens = (
            <div className="d-flex flex-column flex-md-row pl-3 pr-3 align-items-center">
              <NavItem>
                <NavLink>
                    <Link className="p-1 Auth-link" to="/auth/login">Login</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                    <Link className="p-1 Auth-link" to="/auth/register">Register</Link>
                </NavLink>
              </NavItem>
            </div>
        )
      
        const userScreens = ( 
            <div className="d-flex flex-md-row pl-3 pr-3 align-items-center">
                <NavItem>
                <AuthContext.Consumer>
                  {({ logout }) => <NavLink href="#" onClick={() => logout()}>Logout</NavLink>}
                </AuthContext.Consumer>
                </NavItem>
            </div>
        )

        return(
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">logo</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>
                                    <Link to="/">Sản phẩm</Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link to="/dat-hang-page">Đặt hàng</Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link to="/lien-he-page">Liên hệ</Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link to="/ve-chung-toi">Về chúng tôi</Link>
                                </NavLink>
                            </NavItem>
                            <AuthContext.Consumer>
                                {({isLogedIn}) => {
                                    return (
                                    <nav>
                                        {!isLogedIn ? guestScreens : userScreens}
                                    </nav>
                                    )
                                }}
                            </AuthContext.Consumer>
                        </Nav>
                    </Collapse>
                </Navbar>    
        )
    }
}

export default NavComponent