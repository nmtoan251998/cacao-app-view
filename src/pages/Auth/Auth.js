import React, { Component } from "react";
import LoginBox from '../../components/Auth/LoginBox';
import RegisterBox from '../../components/Auth/RegisterBox';

import {Container, Col, Row} from "reactstrap"
import "./Auth.css"

class Auth extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
        }
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false})
    }

    showRegisterBox() {
        this.setState({isLoginOpen: false, isRegisterOpen: true})
    }

    render() {
        return (
            <Container>
                <Col sm="4" className="m-auto shadow-lg">
                <Row className="d-flex flex-row justify-content-center mt-3 mb-2">
                    <div 
                    className={"text-muted p-2 Auth-controller flex-grow-1 text-center border-bottom " + (this.state.isLoginOpen ? "border-danger" : "")} 
                    onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                    <div 
                    className={"text-muted p-2 Auth-controller flex-grow-1 text-center border-bottom " + (this.state.isRegisterOpen ? "border-danger" : "")} 
                    onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </Row>
                <div>
                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegisterOpen && <RegisterBox />}
                </div>
                </Col>
            </Container>
        )
    }
}

export default Auth