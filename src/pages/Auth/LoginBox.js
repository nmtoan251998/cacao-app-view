import React , { Component } from 'react';
import {Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from "axios";
import "./Box.css"

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountname: "",
            password: "",
            errors: []
        }
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

    goToRegister(e) {
        this.props.history.push("/auth/register")
    }

    onAccountChange(e) {
        this.setState({ accountname: e.target.value });
        this.clearValidationErr("accountname");
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({errors: [...prevState.errors, {elm, msg}], }));
    }

    submitLogin(e) {
        e.preventDefault();
        let userLogin = {
            accountname: this.state.accountname,
            password: this.state.password
        }

        Axios.post("http://localhost:5000/auth/login", userLogin)
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            this.props.history.push("/");
        })
        .catch(() => this.showValidationErr("accountname", "wrong account or password!"))
        
        if(this.state.accountname === "") {
            this.showValidationErr("accountname", "wrong account or password!")
        } 
        if(this.state.password.length < 8 || this.state.password.length > 12) {
            this.showValidationErr("password", "wrong account or password!")
        }    
    }

    render() {
        let accountnameErr, passwordErr;

        for(let err in this.state.errors) {
            if(this.state.errors[err].elm === "accountname") {
                accountnameErr = this.state.errors[err].msg;
            } if(this.state.errors[err].elm === "password") {
                passwordErr = this.state.errors[err].msg
            }
        }

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
                        <small className="text-danger">{accountnameErr ? accountnameErr : ""}</small>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" 
                        onChange={this.onPasswordChange.bind(this)}/>
                        <small className="text-danger">{passwordErr ? passwordErr : ""}</small>
                    </FormGroup>
                    
                    <Button className="w-100" color="danger" onClick={this.submitLogin.bind(this)}>Login</Button>
                    <a href="#" onClick={this.goToRegister.bind(this)} className="text-muted mt-2 text-center">Click here to register!</a>
                </Form>
            </div>
            </Col>
            </Container>
        )
    }
}

export default LoginBox;