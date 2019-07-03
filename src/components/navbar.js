import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    } from 'reactstrap';

import { AuthContext } from '../contexts/AuthContext';

class NavComponent extends Component {

    render() {
        const guestScreens = (
            <div className="row ml-5">
              <NavItem>
                <NavLink>
                    <Link className="p-1 Auth-link" to="/auth/login">Login</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                    <Link className="p-1 Auth-link" to="/auth/register">register</Link>
                </NavLink>
              </NavItem>
            </div>
        )
      
        const userScreens = ( 
            <div className="row ml-5">
                <NavItem>
                <AuthContext.Consumer>
                  {({ logout }) => <NavLink href="#" onClick={() => logout()}>Logout</NavLink>}
                </AuthContext.Consumer>
                </NavItem>
            </div>
        )

        return(
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">logo</NavbarBrand>
                        <Collapse navbar>
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
                </div>
        )
    }
}

export default NavComponent