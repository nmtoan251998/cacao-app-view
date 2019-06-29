import React , { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Box.css"

class LoginBox extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    submitLogin(event) {

    }

    render() {
        return (
            <div className="pr-4 pl-4 pb-3">
                <div className="Box-title p-3 text-muted">Login</div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" placeholder="Username" />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" />
                    </FormGroup>
                    
                    <Button color="danger" onClick={this.submitLogin.bind(this)}>Login</Button>
                </Form>
            </div>
        )
    }
}

export default LoginBox;