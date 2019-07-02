import React , { Component } from 'react';
import {Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios'

import "./Box.css";

class RegisterBox extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            username: "", 
            accountname: "", 
            password: "", 
            password2: "" ,
            usernameErr: undefined, 
            accountnameErr: undefined,
            passwordErr:undefined,
            password2Err: undefined }

        this.showValidationErr = this.showValidationErr.bind(this)
    }

    showValidationErr(usernameErr, accountnameErr, passwordErr, password2Err) {
        this.setState({
            usernameErr: usernameErr,
            accountnameErr: accountnameErr,
            passwordErr: passwordErr,
            password2Err: password2Err
        })
    } 

    onUserChange(e) {
        this.setState({ username: e.target.value });
    }

    onAccountChange(e) {
        this.setState({ accountname: e.target.value });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onPassword2Change(e) {
        this.setState({ password2: e.target.value });
    }

    submitRegister(e) {
        e.preventDefault();
        let userRegister = {
            username: this.state.username,
            accountname: this.state.accountname,
            password: this.state.password,
            password2: this.state.password2
        }

        if(!userRegister.username) {
            this.showValidationErr("username much be required!", undefined, undefined, undefined)
        } else if(!userRegister.accountname) {
            this.showValidationErr(undefined, "username much be required!", undefined, undefined)
        } else if(userRegister.password.length < 8 || userRegister.password.length > 12) {
            this.showValidationErr(undefined, undefined,"password much be 8 to 12!", undefined)
        } else {
            Axios.post("http://localhost:5000/auth/register", userRegister)
            .then(() => window.alert("your register is successful!"))
            .then(() => this.props.history.push("/auth/login"))
            .catch(err => {
                if(err.response.data.error.accountExist) {
                    this.showValidationErr(undefined, err.response.data.error.accountExist, undefined, undefined)
                } else {
                    this.showValidationErr(undefined, undefined,undefined, err.response.data.error.passwordNotMatch)
                }
                console.log(err.response.data.error)
            })
        }
    }    

    render() {
        return (
            <Container>
            <Col sm="10" md="6" lg="4" className="m-auto shadow-lg">
            <div className="pr-4 pl-4 pb-3">
                <div className="Box-title p-3 text-muted">
                    Register
                </div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={(this.onUserChange.bind(this))} 
                        required/>
                        <small className="text-danger">{this.state.usernameErr ? this.state.usernameErr : ""}</small>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="accountname">Accountname</Label>
                        <Input 
                        type="Email" 
                        name="accountname" 
                        placeholder="Accountname" 
                        onChange={(this.onAccountChange.bind(this))}
                        required/>
                        <small className="text-danger">{this.state.accountnameErr ? this.state.accountnameErr : ""}</small>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={(this.onPasswordChange.bind(this))}
                        required/>
                        <small className="text-danger">{this.state.passwordErr ? this.state.passwordErr : ""}</small>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password2">Rewrite password</Label>
                        <Input 
                        type="password" 
                        name="password2" 
                        placeholder="Password" 
                        onChange={(this.onPassword2Change.bind(this))}
                        required/>
                        <small className="text-danger">{this.state.password2Err ? this.state.password2Err : ""}</small>
                    </FormGroup>
                    
                    <Button className="w-100" color="danger" onClick={this.submitRegister.bind(this)}>Register</Button>
                </Form>
            </div>
            </Col>
            </Container>
        )
    }
}

export default RegisterBox;