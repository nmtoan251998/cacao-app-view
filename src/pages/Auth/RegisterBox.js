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
            errors: [] }
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({errors: [...prevState.errors, {elm, msg}], }));
    } 

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err in prevState.errors) {
                if(elm !== prevState.errors[err].elm) {
                    newArr.push(prevState.errors[err])
                }    
            }
            return {errors: newArr};
        })
    }

    onUserChange(e) {
        this.setState({ username: e.target.value });
        this.clearValidationErr("username");
    }

    onAccountChange(e) {
        this.setState({ accountname: e.target.value });
        this.clearValidationErr("accountname");
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
    }

    onPassword2Change(e) {
        this.setState({ password2: e.target.value });
        this.clearValidationErr("password2");
    }

    submitRegister(e) {

        let userRegister = {
            username: this.state.username,
            accountname: this.state.accountname,
            password: this.state.password,
            password2: this.state.password2
        }

        Axios.post("http://localhost:5000/auth/register", userRegister)
        .then(() => window.alert("your register is successful!"))
        .then(() => this.props.history.push("/auth/login"))
        .catch(() => this.showValidationErr("accountname", "This account name already axist"))

        if(this.state.username === "") {
            this.showValidationErr("username", "username much be required!");
        } 
        if(this.state.accountname === "") {
            this.showValidationErr("accountname", "account much be required!")
        } 
        if(this.state.password.length < 8 || this.state.password.length > 12) {
            this.showValidationErr("password", "password much have 8 to 12 words!")
        }
         
        if(this.state.password2 !== this.state.password) {
            this.showValidationErr("password2", "password is incorrect!")
        }

        console.log(userRegister)
    }

    render() {
        let usernameErr, accountnameErr, passwordErr, password2Err;

        for(let err in this.state.errors) {
            if(this.state.errors[err].elm === "username") {
                usernameErr = this.state.errors[err].msg;
            } if(this.state.errors[err].elm === "accountname") {
                accountnameErr = this.state.errors[err].msg;
            } if(this.state.errors[err].elm === "password") {
                passwordErr = this.state.errors[err].msg
            } if(this.state.errors[err].elm === "password2") {
                password2Err = this.state.errors[err].msg
            }
        }

        return (
            <Container>
            <Col sm="4" className="m-auto shadow-lg">
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
                        onChange={(this.onUserChange.bind(this))}/>
                        <small className="text-danger">{usernameErr ? usernameErr : ""}</small>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="accountname">Accountname</Label>
                        <Input 
                        type="Email" 
                        name="accountname" 
                        placeholder="Accountname" 
                        onChange={(this.onAccountChange.bind(this))}/>
                        <small className="text-danger">{accountnameErr ? accountnameErr : ""}</small>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={(this.onPasswordChange.bind(this))}/>
                        <small className="text-danger">{passwordErr ? passwordErr : ""}</small>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password2">Rewrite password</Label>
                        <Input 
                        type="password" 
                        name="password2" 
                        placeholder="Password" 
                        onChange={(this.onPassword2Change.bind(this))}/>
                        <small className="text-danger">{password2Err ? password2Err : ""}</small>
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