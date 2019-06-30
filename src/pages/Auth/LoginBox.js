import React , { Component } from 'react';
import {Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from "axios";
import "./Box.css"

class LoginBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountname: "",
            password: ""
        }
    }

    goToRegister(e) {
        this.props.history.push("/auth/register")
    }

    onAccountChange(e) {
        this.setState({ accountname: e.target.value })
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    submitLogin(event) {
        let userLogin = {
            accountname: this.state.accountname,
            password: this.state.password
        }

        Axios.post("http://localhost:5000/auth/login", userLogin)
        .then(() => {
            console.log("login...");
            this.props.history.push("/")
        })
        .catch(err => console.log(err))

    }

    render() {
        return (
            <Container>
            <Col sm="4" className="m-auto shadow-lg">
            <div className="pr-4 pl-4 pb-3">
                <div className="Box-title p-3 text-muted">Login</div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="accountname">Accountname</Label>
                        <Input 
                        type="text" 
                        name="accountname" 
                        placeholder="Accountname" 
                        onChange={this.onAccountChange.bind(this)}/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" 
                        onChange={this.onPasswordChange.bind(this)}/>
                    </FormGroup>
                    
                    <Button className="w-100" color="danger" onClick={this.submitLogin.bind(this)}>Login</Button>
                    <p onClick={this.goToRegister.bind(this)} className="text-muted mt-2 text-center">Click here to register!</p>
                </Form>
            </div>
            </Col>
            </Container>
        )
    }
}

export default LoginBox;