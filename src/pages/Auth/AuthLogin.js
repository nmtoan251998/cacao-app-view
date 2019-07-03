import React , { Component } from 'react';
import {Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from "react-router-dom"

import "./Box.css";
import { AuthContext } from "../../contexts/AuthContext"

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountname: "",
            password: "",
        }
    } 

    goToRegister(e) {
        this.props.history.push("/auth/register")
    }

    onAccountChange(e) {
        this.setState({ accountname: e.target.value });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <Container className="mt-5">
                <AuthContext.Consumer>
                    {({isLogedIn}) => {
                        return (
                            <div>{isLogedIn ? <Redirect to="/"/> : ""}</div>
                        )
                    }}
                </AuthContext.Consumer>
                <Col sm="10" md="6" lg="4" className="m-auto shadow-lg">
                    <div className="pr-4 pl-4 pb-3">
                        <div className="Box-title p-3 text-muted">Login</div>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="accountname">Accountname</Label>
                                <Input 
                                type="text" 
                                name="accountname" 
                                placeholder="Accountname" 
                                onChange={this.onAccountChange.bind(this)}
                                required/>
                                <AuthContext.Consumer>
                                    {({accountnameErr}) => {
                                        return (
                                            <small className="text-danger">{accountnameErr ? accountnameErr : ""}</small>
                                        )
                                    }}
                                </AuthContext.Consumer>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" 
                                name="password" 
                                placeholder="Password"
                                required 
                                onChange={this.onPasswordChange.bind(this)}
                                required/>
                                <AuthContext.Consumer>
                                    {({passwordErr}) => {
                                        return (
                                            <small className="text-danger">{passwordErr ? passwordErr : ""}</small>
                                        )
                                    }}
                                </AuthContext.Consumer>
                            </FormGroup>
                            <AuthContext.Consumer>
                                {({submitLogin}) => <Button 
                                className="w-100" 
                                color="danger" 
                                onClick={() => submitLogin({
                                    accountname: this.state.accountname,
                                    password: this.state.password
                                })}>Login</Button>}
                            </AuthContext.Consumer>
                        </Form>
                    </div>
                </Col>
            </Container>
        )
    }
}

export default LoginBox;