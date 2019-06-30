import React , { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from "axios"
import "./Box.css"

class LoginBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    onUserChange(e) {
        this.setState({ username: e.target.value })
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    submitLogin(event) {
        let userLogin = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(userLogin);
        Axios.post("http://localhost:5000/auth/login", userLogin)
        .then(() => console.log("userLogin was post"))
        .catch(err => console.log(err))

    }

    render() {
        return (
            <div className="pr-4 pl-4 pb-3">
                <div className="Box-title p-3 text-muted">Login</div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={this.onUserChange.bind(this)}/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" 
                        onChange={this.onPasswordChange.bind(this)}/>
                    </FormGroup>
                    
                    <Button className="w-100" color="danger" onClick={this.submitLogin.bind(this)}>Login</Button>
                </Form>
            </div>
        )
    }
}

export default LoginBox;